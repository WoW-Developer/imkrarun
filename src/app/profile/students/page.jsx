'use client'

import { useEffect, useState } from 'react'
import { addDoc, setDoc, collection, getDocs, query, where, doc } from "firebase/firestore";
import { auth, db } from '@/app/lib/firebase/firebase';
import { onAuthStateChanged } from 'firebase/auth';
import { useRouter } from 'next/navigation';
import { Roboto_Flex } from "@next/font/google";
import { toast, Toaster } from 'react-hot-toast';
import { fromJSON } from 'postcss';


const google = Roboto_Flex({ subsets: ["latin"] });
const Page = () => {
    const router = useRouter();
    // Create a query against the collection.
    const [student,setStudent] = useState({});
    const [loading,setLoading] = useState(true);
    const [addnew,setAddnew] = useState(false);
    const [formData,setFormData] = useState({
        name:"",
        class:"",
        board:"",
        group:"",
        tutor:""
    });
    
    useEffect(() => {
        
        onAuthStateChanged(auth,(user) => {
            if (user) {
                const roomsRef = collection(db, "session-rooms");
                const q = query(roomsRef, where("tutor", "==", user.uid));
                getDocs(q).then((querySnapshot) => {
                    const ax = [];
                    querySnapshot.forEach((doc) => {
                        // doc.data() is never undefined for query doc snapshots
                        const dd = doc.data();
                        const data = {
                            name: dd.name,
                            class:dd.class,
                            board:dd.board,
                            group:dd.group,
                            id:dd.docid
                                       };
                        ax.push(data);
                    });
                    setStudent(ax);
                    setLoading(false);
                });
            }
            else
                router.replace("/");
        });

    },[router])

    
    const addNewStudent = async () => {
        if(formData.name==""||formData.class==""||formData.board==""||formData.group==""){
            toast.error('Please fill all the fields');
            return;
        }
        setLoading(true);
        addDoc(collection(db, "session-rooms"), {
            name:formData.name,
            class:formData.class,
            group:formData.group,
            board:formData.board,
            tutor:auth.currentUser.uid,
          }).then((docRef) => {
           // toast.success('Doc Added'+ docRef.id);
            setAddnew(false);
            setDoc(doc(db, "session-rooms",docRef.id),{docid:docRef.id},{merge:true}).then(()=>{
                toast.success('Student Added Successfully');
                setAddnew(false);
                setLoading(false);
                
                
            }).catch((err) => {
                toast.error('Error while adding student'+err.message);
                setLoading(false);
            })
            student.push(formData)

                setFormData({name:"",
                class:"",
                board:"",
                group:"",
                tutor:""});
        
        }).catch((err) => {
            setLoading(false);
            toast.error('Error while adding student'+err.message);
        })
               
    }
    
    const handleChange = (event) => {
        setFormData({...formData, [event.target.name]: event.target.value });

      };

    if(!loading&& addnew){
        return (
            <div className='flex flex-col w-screen min-h-screen justify-center items-center'>
                <div className='flex flex-col w-fit'>
                <form className='flex flex-col text-xl'>
      <div className='flex flex-col'>
      <label htmlFor="name">Name:</label>
      <input id="name" className='rounded-lg my-2 p-2 text-black bg-white/30' name='name' required={true} type="text" value={formData.name} onChange={handleChange} />
      </div>
      <div className='flex flex-col'>
      <label htmlFor="class">Class:</label>
      <input id="class" className='rounded-lg my-2 p-2 text-black bg-white/30' name='class' required={true} type="text" value={formData.class} onChange={handleChange} />
      </div>
      <div className='flex flex-col'>
      <label htmlFor="board">Board:</label>
      <input id="board" className='rounded-lg my-2 p-2 text-black bg-white/30' name='board' required={true} type="text" value={formData.board} onChange={handleChange} />
      </div>
      <div className='flex flex-col'>
      <label htmlFor="group">Group:</label>
      <input id="group" className='rounded-lg my-2 p-2 text-black bg-white/30' name='group' required={true} type="text" value={formData.group} onChange={handleChange} />
      </div>
      <button className='p-2 text-black bg-white rounded-lg bg-white/50' type="submit" onClick={(e)=>{e.preventDefault();
        addNewStudent()}}>Submit</button>
      <button className='p-2 text-black bg-white rounded-lg bg-white/50 my-2' type="cancel" onClick={(e)=>{e.preventDefault(); setAddnew(false)}}>Cancel</button>
    </form>
                </div></div>
        )
    }
    

if (!loading && !addnew){  return (
    <div className={google.className}>
              <Toaster />

    <div className='flex h-screen justify-center items-center'>
        
        <div className='flex flex-col w-fit'>
            <h1 className='text-lg text-white self-end my-3' onClick={(e)=>{e.preventDefault(); 
                setAddnew(true)}}> Add Students✍️</h1>
       
        <table className="table-auto text-xl font-mono font-extralight rounded-xl items-center">
  <thead>
    <tr className=' rounded-t-xl'>
      <th className='table-cell bg-gray-700 rounded-tl-md text-start p-3 '>🏬 </th>
      <th className='table-cell bg-gray-700  text-start p-3 '>Name</th>
      <th className='table-cell bg-gray-700 text-start p-3 '>Class</th>
      <th className='table-cell bg-gray-700  text-start p-3 '>Board</th>
      <th className='table-cell bg-gray-700 text-transparent rounded-tr-md text-start p-3 '>View</th>
    </tr>
  </thead>
  <tbody className='border-separate'>
    {
        student.map((data,index)=>{
            return (
                <tr className='even:bg-slate-400 bg-slate-600' key={index}>

                    <td className='table-cell first:rounded-bl-md p-3 text-center '>{index+1}</td>
                    <td className='table-cell p-3 text-start '>{data.name}</td>
                    <td className='table-cell p-3 text-center '>{data.class}</td>
                    <td className='table-cell p-3 text-center '>{data.board}</td>
                    <td onClick={(e)=>{e.preventDefault; router.push('/profile/students/'+data.id) }} className='table-cell last:rounded-br-md p-3 hover:bg-slate-500 text-center'>📂</td>
                </tr>
            )
        })
    }
  </tbody>

</table>
</div>
       </div>
       </div>
  )}
  return (
    <div className='flex h-screen justify-center items-center'>
        <div className='flex flex-col'>
            <h1 className='text-2xl text-white animate-pulse'>Loading data...</h1>
        </div>

    </div>)
}

export default Page