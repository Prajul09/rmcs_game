import Link from "next/link";
import { useState,useEffect } from "react";
import { useRouter } from "next/router";
import { callApi } from "../../helpers/helpers";

interface FormData{
    email : String
    password : String
}
const index = () => {
    const router = useRouter()
    const initialValues = {email:"" , password:""};
    const [formValue, setFormValue] = useState<FormData>(initialValues);
    const [formError, setFormError] = useState({email:'',password:''});
    const [isSubmit, setisSubmit] = useState(false);
    const changeHandler = (e:any) =>{
        const {name,value} = e.target;
        setFormValue({...formValue,[name]:value});
        //console.log(formValue);
    };
    const submitHandler = (e:any) => {
        e.preventDefault();
        setFormError(validate(formValue));
        loginUser(formValue);
        setisSubmit(true);
    };
    const loginUser = async (data:FormData) => {
        const res = await callApi('/api/signin',data);
        console.log(res,"============");
        if(res.status){
            router.push("/dashboard");
        }
        else{
            alert("Invalid Credentials");
        }
        // try {
        //     fetch(`/api/signin`, {
        //         method: 'POST',
        //         headers: {
        //             'Accept': 'application/json',
        //             'Content-Type': 'application/json'
        //         },
        //         body:JSON.stringify(data)
        //     })
        //     .then(res => res.json())
        //     .then(res => {
        //         if(res.status){
        //             router.push("/profile")
        //         }else{
        //            alert("Invalid Credentials");
        //         }
        //     })
        // } catch (error) {
        //     console.log(error)
        // }
    }
    useEffect(() => {
        if(Object.keys(formError).length === 0 && isSubmit){
            console.log(formValue)
        }
    }, [formError]);
    const validate = (values:any) =>{
    const errors = {email:'',password:''};
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/i;
    if(!values.email){
        errors.email ="Email is required";
    }else if(!regex.test(values.email)){
        errors.email ="This is not a valid email format!";
    }
    if(!values.password){
        errors.password ="Password is required";
    }else if(values.password.length < 4){
        errors.password ="Password must be more than 4 characters!";
    }
    else if(values.password.length > 10){
        errors.password ="Password cannot exceed more than 10 characters!";
    }
    return errors;
    };
  return (
    <div>
        <div className='bg-zinc-200 flex justify-center items-center h-screen'>
            <div className='bg-white pl-10 h-[500px] flex flex-col pt-10 w-[350px]'>
                <form onSubmit={submitHandler} action="/profile">
                    <div>
                        <p className='font-semibold text-2xl underline pl-10 '>Login in League</p>
                    </div>
                    <div className='mr-5 pt-5'>
                        <p className='text-zinc-600 font-semibold pb-1'>Email</p>
                        <input className='h-10 px-5 border border-sm  rounded-md' type="email" name="email" onChange={changeHandler} placeholder='abc@example.com' />
                    </div>
                    <p className="text-red-600">{formError.email}</p>
                    <div className='mr-5'>
                        <p className='text-zinc-600 pt-2 font-semibold pb-1'>Password</p>
                        <input className='h-10 px-5 border border-sm  rounded-md' type="Password" name="password" onChange={changeHandler} placeholder='***********' />
                    </div>
                    <p className="text-red-600">{formError.password}</p>
                    <div className='flex gap-5 mt-2'>
                        <input type="checkbox" />
                        <p>Remember me?</p>
                    </div>
                    <div className='mr-5 mt-4'>
                        <button type="submit" className='bg-red-400 h-10 rounded hover:bg-red-600 duration-300 w-full text-white font-semibold'>Login</button>
                        <p className='text-end mt-1'>Forget Password</p>
                    </div>
                    {/* <p className='flex justify-center font-bold'>OR</p>
                    <div className='flex ml-14 mt-2'>
                        <ul className='flex flex-row justify-center gap-10 text-2xl'>
                            <li className='rounded-full text-blue-600'><i className="ri-facebook-circle-fill"></i></li>
                            <li className='rounded-full text-red-600' ><i className="ri-google-fill"></i></li>
                            <li className='rounded-full'><i className="ri-github-fill"></i></li>
                        </ul>
                    </div> */}
                    <div className='mt-3'>
                        <p className='text-zinc-500'>Need an Account? <span className='text-black font-bold underline'><Link href="/signup">Signup</Link></span></p>
                    </div>
                </form>
            </div>
        </div>
    </div>
  )
}
export default index