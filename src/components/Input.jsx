import React ,{ useContext ,useState }from "react";
import { IoIosAttach } from "react-icons/io";
import { AuthContext } from "./../context/AuthContext";
import { ChatContext } from "./../context/ChatContext";
import { doc, Timestamp, updateDoc ,arrayUnion, serverTimestamp} from "firebase/firestore";
import { db, storage } from './../firebase';
import {v4 as uuid} from "uuid";
import { getDownloadURL, ref, uploadBytesResumable } from "firebase/storage";

const Input = () => {
  const [text, setText] = useState("");
  const [img, setimg] = useState(null);
  const { currentUser } = useContext(AuthContext);
  const { data } = useContext(ChatContext);

  const handleSend = async() => {
    if(img){
      const storageRef = ref(storage, uuid());
      const uploadTask = uploadBytesResumable(storageRef, img);

      uploadTask.on(
        (error) => {
          // setError(true)
        },
        () => {
          getDownloadURL(uploadTask.snapshot.ref).then(async(downloadURL) => {
            await updateDoc(doc(db , "chats" , data.chatId) , {
              messages: arrayUnion({
                id:uuid(),
                text,
                senderId:currentUser.uid,
                date:Timestamp.now(),
                img:downloadURL
              })
            })
          });
        }
      );

    }else{
      await updateDoc(doc(db , "chats" , data.chatId) , {
        messages: arrayUnion({
          id:uuid(),
          text,
          senderId:currentUser.uid,
          date:Timestamp.now(),
        })
      })
    }

    await updateDoc(doc(db , "userchats" , currentUser.uid ) , {
      [data.chatId+".lastMessage"]:{
        text
      },
      [data.chatId+".date"]: serverTimestamp(),
    })

    await updateDoc(doc(db , "userchats" , data.user.uid ) , {
      [data.chatId+".lastMessage"]:{
        text
      },
      [data.chatId+".date"]: serverTimestamp(),
    })

    setText("")
    setimg(null)
  };
  return (
    <div className="input">
      <input
        type="text"
        placeholder="Type Something..."
        onChange={(e) => setText(e.target.value)}
        value={text}
      />
      <div className="send">
        <input
          type="file"
          style={{ display: "none" }}
          id="file"
          onChange={(e) => setimg(e.target.files[0])}
        />
        <label htmlFor="file">
          <p>
            <IoIosAttach />
          </p>
        </label>
        <button onClick={handleSend}>Send</button>
      </div>
    </div>
  );
};

export default Input;
