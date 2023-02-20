'use client'

import { useEffect, useState } from 'react'
import { addDoc, collection, doc, getDocs, query, setDoc, where } from "firebase/firestore";
import { auth, db } from '@/app/lib/firebase/firebase';
import { onAuthStateChanged } from 'firebase/auth';
import { useRouter } from 'next/navigation';
import { toast, Toaster } from 'react-hot-toast';
import { Roboto_Flex } from "@next/font/google";


const google = Roboto_Flex({ subsets: ["latin"] });

const Page = ({params}) => {
    const router = useRouter();
    // Create a query against the collection.
    const [student,setStudent] = useState({});
    const [loading,setLoading] = useState(true);
    const [addnew,setAddnew] = useState(false);
    const [formData,setFormData] = useState({
        date:"",
        time:"",
        payment:"",
    });
    
    useEffect(() => {
        onAuthStateChanged(auth,(user) => {
            if (user) {
                const roomsRef = collection(db, "session-rooms",params.id,"sessions");
                const q = query(roomsRef);
                getDocs(q).then((querySnapshot) => {
                    const ax = [];
                    querySnapshot.forEach((doc) => {
                        // doc.data() is never undefined for query doc snapshots
                        const dd = doc.data();
                        const data = {
                            date: dd.date,
                            payment:dd.payment,
                            time:dd.time,
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

    },[params.id, router])
    

    const addNewSession = () => {
        if(formData.date=="" || formData.time=="" || formData.payment==""){
            toast.error('Please fill all the fields');
            return;
        }
        addDoc(collection(db, "session-rooms",params.id,"sessions"), {
            date:formData.date,
            payment:formData.payment,
            time:formData.time,
          }).then((docRef) => {
            setAddnew(false);
            setDoc(doc(db, "session-rooms",params.id,"sessions",docRef.id),{docid:docRef.id},{merge:true}).then(()=>{
                toast.success('Session Added Successfully');
            })
            student.push(formData);
           }).catch((err) => {
            toast.error('Error while adding session');
           })
          
    }
    
    const handleChange = (event) => {
        setFormData({...formData, [event.target.name]: event.target.value });

      };

    if(!loading && addnew){
        return (
            <div className='flex flex-col w-screen min-h-screen justify-center items-center'>
                <div className='flex flex-col w-fit'>
                <form className='flex flex-col text-xl'>
      <div className='flex flex-col'>
      <label htmlFor="date">Date:</label>
      <input id="date" className='rounded-lg my-2 p-2 text-black bg-white/30' name='date' required={true} type="text" value={formData.date} onChange={handleChange} />
      </div>
      <div className='flex flex-col'>
      <label htmlFor="time">Time:</label>
      <input id="time" className='rounded-lg my-2 p-2 text-black bg-white/30' name='time' required={true} type="text" value={formData.time} onChange={handleChange} />
      </div>
      <div className='flex flex-col'>
      <label htmlFor="payment">Payment:</label>
      <input id="payment" className='rounded-lg my-2 p-2 text-black bg-white/30' name='payment' required={true} type="text" value={formData.payment} onChange={handleChange} />
      </div>
      <button className='p-2 text-black bg-white rounded-lg bg-white/50' type="submit" onClick={(e)=>{e.preventDefault();addNewSession()}}>Submit</button>
      <button className='p-2 text-black bg-white rounded-lg bg-white/50 my-2' type="cancel" onClick={(e)=>{e.preventDefault(); setAddnew(false)}}>Cancel</button>
    </form>
                </div></div>
        )
    }

if (!loading && !addnew){  return (
    <div className={google.className}>
    <div className='flex h-screen flex-col justify-center items-center'>
              <Toaster />
    <div className='flex flex-col w-fit'>
    <div className='self-end align-middle my-2'>
        <h1 className='text-xl text-white align-middle' onClick={(e)=>{e.preventDefault();
                setAddnew(true);
                ;}}>Add New Session✍️</h1>
    </div>

{/* //TODO: Table Starts here */}

        <table className="table-auto text-xl font-mono font-extralight rounded-xl items-center">
  <thead>
    <tr className=' rounded-t-xl'>
      <th className='table-cell bg-gray-700 rounded-tl-md text-start p-3 '>🗓️ </th>
      <th className='table-cell bg-gray-700  text-start p-3 '>Date</th>
      <th className='table-cell bg-gray-700 text-start p-3 '>Time</th>
      <th className='table-cell bg-gray-700  text-start p-3 '>Payment</th>
      <th className='table-cell bg-gray-700 text-transparent rounded-tr-md text-start p-3 '>View</th>
    </tr>
  </thead>
  <tbody className='border-separate'>
    {
        student.map((data,index)=>{
            return (
                <tr className='even:bg-slate-400 bg-slate-600' key={index}>

                    <td className='table-cell first:rounded-bl-md p-3 text-center '>{index+1}</td>
                    <td className='table-cell p-3 text-start '>{data.date}</td>
                    <td className='table-cell p-3 text-center '>{data.time}</td>
                    <td className='table-cell p-3 text-center '>{data.payment}</td>
                    <td onClick={(e)=>{e.preventDefault;
                        if(data.payment=='Done'){
                            toast.success('Be Happy Already Payment Processed',{position:'bottom-left'});
                            return;
                        }
                     setLoading(true);
                     setDoc(doc(db, "session-rooms",params.id,"sessions",data.id ), {payment:"Done"},{merge:true}).then((docRef)=>{
                        data.payment = "Done";
                        toast.success('Payment Status Changed');
                        setLoading(false);
                     }).catch((err)=>{
                        toast.error('Payment update failed');
                        setLoading(false);
                        toast.dismiss();
                     }); }} className='table-cell last:rounded-br-md p-3 text-center hover:bg-slate-500'>{data.payment=='Done'?'😊' :'📝'}</td>
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