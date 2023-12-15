import React,{useState} from "react";
import BUTTON from "../../../components/molecules/global/Button";
import { Link } from "react-router-dom";
import Axios from "axios";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";

const AdminLogin = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const navigate = useNavigate();

  const baseURL = process.env.REACT_APP_BASE_URL;
  const loginURL = `${baseURL}/auth/login?type=company`;


  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("clickeedddddddddd")
    console.log(formData, "formdata")

    await Axios.post(loginURL, formData).then((res) => {
      console.log(res);
      if (res.status === 200) {
        Swal.fire({
          title: 'Success!',
          text: 'Login succesfull!!!!!',
          icon: 'success',
          confirmButtonText: 'OK'
        }).then((result) => {
          if (result.isConfirmed) {
            navigate('/dashboard/admin')
          }
        }) 
      }else{
        Swal.fire({
          title: 'Error!',
          text: 'Login failed!!!!!',
          icon: 'error',
          confirmButtonText: 'OK'
        })
      }
    }).catch((err) => {
      console.log(err)
      Swal.fire({
        title: 'Error!',
        text: 'Login failed!!!!!',
        icon: 'error',
        confirmButtonText: 'OK'
      }).then((result) => {
        if (result.isConfirmed) {
          setFormData({
            email: "",
            password: "",
          })
          e.target.reset()
          
        }
      })

    })
  }



  return (
    <main className="w-full h-screen flex justify-center items-center">
      <form className="rounded-md w-[500px] p-5" onSubmit={handleSubmit}>
        <div className="logo flex justify-center items-center">
          <img src="https://tinyurl.com/3wuh45ve" alt="INSURE LOGO" />
        </div>
        <h1 className="font-bold mb-4 text-2xl lg:text-4xl">
            Welcome <span className="text-[--orange-bg]">Back</span> Admin
          </h1>
        <div className="flex flex-col w-full my-2">
          <input
            type="email"
            value={formData.email}  
            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
            className="px-2 py-3 my-2 rounded-[3px] border border-blue-500 focus:outline-none"
            placeholder="Enter email address"
          />
          <input
            type="password"
            value={formData.password}
            onChange={(e) =>setFormData({ ...formData, password: e.target.value })}
            className="px-2 py-3 my-2 rounded-[3px] border border-blue-500 focus:outline-none"
            placeholder="Enter password"
          />
        </div>
        <BUTTON
          description="Login"
          width = 'w-full'
        //   className="w-full text-[#000]"
        />
        <Link to="/auth/admin/forgetpassword" className='text-[12px] mt-5 pl-2'>Forgot password?</Link>
        
      </form>
    </main>
  );
};

export default AdminLogin;
