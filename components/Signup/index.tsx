import React,{useState,useEffect} from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import {callApi} from '../../helpers/helpers';
interface FormData{
    first_name : String
    last_name : String
    gender : String
    email : String
    password : String
    confirmPassword : String
}
//helper('',data)
const index = () => {
    const router = useRouter();
    const initialValues = {first_name:"",last_name:"",gender:"",email:"" , password:"",confirmPassword:""};
    const [formValue, setFormValue] = useState<FormData>(initialValues);
    const [formError, setFormError] = useState({first_name:"",last_name:"",email:'',password:'',confirmPassword:''});
    const [isSubmit, setisSubmit] = useState(false);
    const changeHandler = (e:any) =>{
        const {name,value} = e.target;
        setFormValue({...formValue,[name]:value});
        //console.log(formValue);
    };
    const submitHandler = (e:any) => {
        e.preventDefault();
        //console.log(formValue);
        // setFormError(validate(formValue));
        // createUser(formValue);
        // setisSubmit(true);
        if(!validate(formValue)){
            console.log("Invalid");
        }else{
            createUser(formValue);
            setisSubmit(true);
        }
    };
    const createUser =async (data:FormData) => {
        let userData = {
            first_name:data.first_name,
            last_name:data.last_name,
            gender:data.gender,
            email:data.email,
            password:data.password
        }
       const res = await callApi('/api/register',userData)
       console.log(res, '==========')
       if(res.status){
        router.push('/login');
       }
       else{
        alert('User Already Exists');
       }
        // try {
        //     fetch(`/api/register`, {
        //         method: 'POST',
        //         headers: {
        //             'Accept': 'application/json',
        //             'Content-Type': 'application/json'
        //         },
        //         body:JSON.stringify(data)
        //     })
        //     .then(res => res.json())
        //     .then(res => console.log(res));
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
        console.log("values=========", values)
        let isValid = true;
        const errors = {first_name:'',last_name:'',email:'',password:'',confirmPassword:''};
        const regex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/i;
        if(!values.first_name){
            errors.first_name ="First Name is required";
            isValid = false;
        }else if(values.first_name.length < 3){
            errors.first_name ="First Name must be more than 3 characters!";
            isValid = false;
        }
        if(!values.last_name){
            errors.last_name ="Last Name is required";
            isValid = false;
        }else if(values.last_name.length < 3){
            errors.last_name ="Last Name must be more than 3 characters!";
            isValid = false;
        }
        if(!values.email){
            errors.email ="Email is required";
            isValid = false;
        }else if(!regex.test(values.email)){
            errors.email ="This is not a valid email format!";
            isValid = false;
        }
        if(!values.password){
            errors.password ="Password is required";
            isValid = false;
        }else if(values.password.length < 4){
            errors.password ="Password must be more than 4 characters!";
            isValid = false;
        }
        else if(values.password.length > 10){
            errors.password ="Password cannot exceed more than 10 characters!";
            isValid = false;
        }
        if(values.password !== values.confirmPassword){
            errors.confirmPassword ="Passwords do not match!";
            isValid = false;
        }
        if(!values.confirmPassword){
            errors.confirmPassword ="Confirm Password is required";
            isValid = false;
        }else if(values.confirmPassword.length < 4){
            errors.confirmPassword ="Confirm Password must be more than 4 characters!";
            isValid = false;
        }
        else if(values.confirmPassword.length > 10){
            errors.confirmPassword ="Confirm Password cannot exceed more than 10 characters!";
            isValid = false;
        }
        setFormError(errors);
        return isValid;
        //return errors;
        };
  return (
    <div>
        <div className='bg-zinc-200 flex justify-center items-center h-screen'>
            <div className='bg-white pl-10 h-[580px] flex flex-col pt-8 w-[350px]'>
                <form onSubmit={submitHandler} action="/login">
                    <div>
                        <p className='font-semibold text-2xl underline pl-8 '>Signup for a League</p>
                    </div>
                    <div className='flex justify-between align-center'>
                        <div className=' mr-5 pt-5'>
                            <p className=' text-zinc-600 font-semibold pb-1'>First Name</p>
                            <input className='h-10 w-[130px] px-5 border border-sm  rounded-md' type="text" name='first_name'  onChange={changeHandler} placeholder='John Doe' />
                            <p className="text-red-600">{formError.first_name}</p>
                        </div>
                        <div className='  mr-5 pt-5'>
                            <p className=' text-zinc-600 font-semibold pb-1'>Last Name</p>
                            <input className='h-10 w-[130px] px-5 border border-sm  rounded-md' type="text" name='last_name'  onChange={changeHandler} placeholder='John Doe' />
                            <p className="text-red-600">{formError.last_name}</p>
                        </div>
                        </div>
                    <div className='mr-5 pt-4'>
                        <p className='text-zinc-600 font-semibold pb-1'>Gender</p>
                    </div>
                    <div className='flex gap-5 mr-5 ml-5'>
                        <input type="radio" name='gender' value="male" onChange={changeHandler} required />
                        <p>Male</p>
                        <input type="radio" name='gender' value="female" onChange={changeHandler} required />
                        <p>Female</p>
                    </div>
                    <div className='mr-5 pt-2'>
                        <p className='text-zinc-600 font-semibold pb-1'>Email</p>
                        <input className='h-10 px-5 border border-sm  rounded-md' type="email" name='email'  onChange={changeHandler} placeholder='abc@example.com' />
                    </div>
                    <p className="text-red-600">{formError.email}</p>
                    <div className='mr-5'>
                        <p className='text-zinc-600 pt-2 font-semibold pb-1'>Password</p>
                        <input className='h-10 px-5 border border-sm  rounded-md' type="Password" name='password'  onChange={changeHandler} placeholder='***********' />
                    </div>
                    <p className="text-red-600">{formError.password}</p>
                    <div className='mr-5'>
                        <p className='text-zinc-600 pt-2 font-semibold pb-1'>Confirm Password</p>
                        <input className='h-10 px-5 border border-sm  rounded-md' type="Password" name='confirmPassword'  onChange={changeHandler} placeholder='***********' />
                    </div>
                    <p className="text-red-600">{formError.confirmPassword}</p>
                    <div className='mr-5 mt-4'>
                        <button type='submit' className='bg-red-400 h-10 rounded hover:bg-red-600 duration-300 w-full text-white font-semibold'>Signup</button>
                    </div>
                    <div className='mt-3'>
                        <p className='text-zinc-500'>Already Account Exists? <span className='text-black font-bold underline'><Link href="/login">Login</Link></span></p>
                    </div>
                </form>
            </div>
        </div>
    </div>
  )
}
export default index