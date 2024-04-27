import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import fetena_logo from "../../assets/fetena_logo_primary.svg";
import { Button, Form, Input, Divider, Dropdown, Menu } from "antd";
import auth_bg from "../../assets/auth_bg.jpg";
import { toast } from "react-toastify";
import { useDispatch, useSelector } from "react-redux";
import { registerUser } from "../../Redux/features/authActions";
import Loading from "../../Components/Loading";

const RegistrationScreen = () => {
  const [step, setStep] = useState(1);
  const [disableSocials, setDisableSocials] = useState(false);
  const [disable, setDisable] = useState(false);
  const dispatch = useDispatch();
  const { loading } = useSelector((state) => state.auth);

  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    gender: "",
    dateOfBirth: "",
    email: "",
    phoneNumber: "",
    password: "",
    passwordConfirm: "",
    role: "user",
    idPhotoType: "",
    profilePhoto: null, // Separate state for the first image
    idPhoto: null, // Separate state for the second image
  });

  const submitFormData = async (formData) => {
    dispatch(registerUser(formData)).then((res) => {
      console.log(res, "response");
      if (res.meta.requestStatus === 'fulfilled') {
        toast.success("Registration Successful!");
        setStep(step + 1);
      } else {
        // console.log(res.payload.message);
        toast.error(res.payload.message);
      }
    }).catch((error) => {
      console.log(error);
      toast.error("Something is wrong!");
    });
  };

  const handleChange = (changedValues) => {
    setFormData((prevData) => ({
      ...prevData,
      ...changedValues,
    }));
    console.log(formData);
  };

  const handleCancelPhoto = () => {
    setFormData((prevData) => ({
      ...prevData,
      photo: null,
    }));
  };

  const handleFileChange = (e, fieldName) => {
    const file = e.target.files[0];
    setFormData((prevData) => ({
      ...prevData,
      [fieldName]: file,
    }));
    console.log(formData);
  };

  const handleNext = () => {
    // Check if all required fields in the current step are filled

    if (step === 1) {
      if (
        formData.firstName &&
        formData.lastName &&
        formData.dateOfBirth &&
        formData.gender
      ) {
        setStep(step + 1);
      } else {
        // Instead of alert("Please fill in all required fields before proceeding.");
        toast.error("Please fill in all required fields before proceeding.");
      }
    }

    if (step === 2) {
      // Regular expressions for validating email format, phone number format, and password format
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      const phoneRegex = /^\d{10}$/;
      const passwordRegex =
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;

      if (
        emailRegex.test(formData.email) &&
        phoneRegex.test(formData.phoneNumber) &&
        passwordRegex.test(formData.password) &&
        formData.password === formData.passwordConfirm
      ) {
        setStep(step + 1);
      } else {
        if (!emailRegex.test(formData.email)) {
          toast.error("Please fill the email in a proper format");
        } else if (!phoneRegex.test(formData.phoneNumber)) {
          toast.error("Please fill the phone number in a proper format");
        } else if (!passwordRegex.test(formData.password)) {
          toast.error(
            "Password must be at least 8 characters long and contain at least one uppercase letter, one lowercase letter, one number, and one special character."
          );
        } else {
          toast.error(
            "Please fill in all required fields correctly before proceeding."
          );
        }
      }
    }

    if (step === 3) {
      if (formData.firstName && formData.lastName && formData.dateOfBirth) {
        setStep(step + 1);
        setDisableSocials(true);
      } else {
        // Instead of alert("Please fill in all required fields before proceeding.");
        toast.error("Please fill in all required fields before proceeding.");
      }
    }
  };

  const handlePrev = () => {
    setStep(step - 1);
  };

  // Menu for the gender dropdown
  const genderMenu = (
    <Menu onClick={(e) => handleChange({ gender: e.key })}>
      <Menu.Item key='male'>Male</Menu.Item>
      <Menu.Item key='female'>Female</Menu.Item>
    </Menu>
  );

  const idPhotoTypeMenu = (
    <Menu onClick={(e) => handleChange({ idPhotoType: e.key })}>
      <Menu.Item key='government'>Government Id</Menu.Item>
      <Menu.Item key='passport'>Passport</Menu.Item>
    </Menu>
  );
  const handleSubmit = (values) => {
    // Submit form data to server
    // setDisable(true)
    // mutate(formData);
    submitFormData(formData);

    // toast.success("An login link has been sent to your email!")
  };

  return (
    <div
      style={{
        backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.6), rgba(0, 0, 0, 0.6)), url(${auth_bg})`,
      }}
      className='p-8 flex justify-center text-center bg-no-repeat bg-cover '>
      <div className='flex flex-col items-center justify-center h-screen gap-4'>
        <div className='flex flex-col items-center justify-center gap-2'>
          <Link to={"/"}>
            <img
              className='w-40'
              src={fetena_logo}
              alt='Fetena.com Logo'
            />
          </Link>
          <h1 className='text-3xl font-bold text-white'>Sign Up</h1>
          <p className="text-white">
            Already have an account?{" "}
            <Link
              to={"/sign-in"}
              className='text-primary-100 hover:underline hover:text-white'>
              Sign in
            </Link>
          </p>
        </div>

        <div className='flex flex-col gap-4 shadow-md px-16 py-8 rounded-lg bg-white '>
          {step !== 5 && (
            <nav className='flex gap-2 px-2 text-base justify-center items-center font-medium leading-5 text-white whitespace-nowrap max-md:flex-wrap'>
              <React.Fragment>
                <div
                  className={`${
                    step >= 1
                      ? " bg-blue-900 text-white"
                      : "bg-blue-100 text-blue-900"
                  } flex justify-center items-center px-3.5  rounded-full h-[34px] w-[34px] `}>
                  1
                </div>
                <div
                  className={`${
                    step > 1 ? "bg-blue-900" : "bg-blue-100"
                  } shrink-0 my-auto h-1.5  rounded-[40px] w-[64px]`}
                />
              </React.Fragment>
              <React.Fragment>
                <div
                  className={`${
                    step >= 2
                      ? " bg-blue-900 text-white"
                      : "bg-blue-100 text-blue-900"
                  } flex justify-center items-center px-3.5  rounded-full h-[34px] w-[34px] `}>
                  2
                </div>
                <div
                  className={`${
                    step > 2 ? "bg-blue-900" : "bg-blue-100"
                  } shrink-0 my-auto h-1.5  rounded-[40px] w-[64px]`}
                />
              </React.Fragment>
              <React.Fragment>
                <div
                  className={`${
                    step >= 3
                      ? " bg-blue-900 text-white"
                      : "bg-blue-100 text-blue-900"
                  } flex justify-center items-center px-3.5  rounded-full h-[34px] w-[34px] `}>
                  3
                </div>
                <div
                  className={`${
                    step > 3 ? "bg-blue-900" : "bg-blue-100"
                  } shrink-0 my-auto h-1.5  rounded-[40px] w-[64px]`}
                />
              </React.Fragment>
              <React.Fragment>
                <div
                  className={`${
                    step >= 4
                      ? " bg-blue-900 text-white"
                      : "bg-blue-100 text-blue-900"
                  } flex justify-center items-center px-3.5  rounded-full h-[34px] w-[34px] `}>
                  4
                </div>
              </React.Fragment>
            </nav>
          )}

          <Form
            onFinish={handleSubmit}
            onValuesChange={handleChange}>
            {step === 1 && (
              <div className='flex flex-col gap-4 mt-4'>
                <h2 className='text-lg font-semibold text-left'>
                  Personal Information
                </h2>
                <div>
                  <div className='flex gap-4'>
                    <Form.Item
                      name='firstName'
                      rules={[
                        { type: "text", message: "Please input a valid name" },
                        {
                          required: true,
                          message: "Please input your First name!",
                        },
                      ]}>
                      <Input
                        name='firstName'
                        placeholder='First Name'
                      />
                    </Form.Item>
                    <Form.Item
                      name='lastName'
                      rules={[
                        { type: "text", message: "Please input a valid name" },
                        {
                          required: true,
                          message: "Please input your Last name!",
                        },
                      ]}>
                      <Input
                        name='lastName'
                        placeholder='Last Name'
                      />
                    </Form.Item>
                  </div>

                  <div className='flex gap-4'>
                    <Form.Item
                      name='dateOfBirth'
                      rules={[
                        {
                          required: true,
                          message: "Please input your Date of birth!",
                        },
                      ]}>
                      <Input
                        name='dateOfBirth'
                        type='date'
                        placeholder='Date of birth'
                        className='w-48'
                      />
                    </Form.Item>

                    <Form.Item
                      name='gender'
                      rules={[
                        {
                          required: true,
                          message: "Please select your gender!",
                        },
                      ]}>
                      <Dropdown.Button
                        overlay={genderMenu}
                        trigger={["click"]}
                        placement='bottomCenter'>
                        {formData.gender ? formData.gender : "Select Gender"}
                      </Dropdown.Button>
                    </Form.Item>
                  </div>
                </div>
              </div>
            )}
            {step === 2 && (
              <div className='flex flex-col gap-4 mt-4'>
                <h2 className='text-lg font-semibold text-left'>
                  Contact Details
                </h2>
                <div>
                  <Form.Item
                    name='email'
                    rules={[
                      { type: "email", message: "Please input a valid email!" },
                      { required: true, message: "Please input your Email!" },
                    ]}>
                    <Input
                      name='email'
                      placeholder='Email'
                    />
                  </Form.Item>
                  <Form.Item
                    name='phoneNumber'
                    rules={[
                      {
                        type: "tel",
                        message: "Please input a valid phone number!",
                      },
                      {
                        required: true,
                        message: "Please input your Phone Number!",
                      },
                    ]}>
                    <Input
                      name='phoneNumber'
                      type='tel'
                      placeholder='Phone Number'
                    />
                  </Form.Item>
                  <Form.Item
                    name='password'
                    rules={[
                      {
                        required: true,
                        message: "Please input your Password!",
                      },
                    ]}>
                    <Input
                      name='password'
                      type='password'
                      placeholder='Password'
                    />
                  </Form.Item>
                  <Form.Item
                    name='passwordConfirm'
                    rules={[
                      {
                        required: true,
                        message: "Please confirm your password!",
                      },
                      ({ getFieldValue }) => ({
                        validator(_, value) {
                          if (!value || getFieldValue("password") === value) {
                            return Promise.resolve();
                          }
                          return Promise.reject(
                            new Error("The two passwords do not match!")
                          );
                        },
                      }),
                    ]}>
                    <Input
                      name='passwordConfirm'
                      type='password'
                      placeholder='Confirm Password'
                    />
                  </Form.Item>
                </div>
              </div>
            )}

            {step === 3 && (
              <div className='step'>
                <h2 className='text-lg font-semibold text-left'>
                  Photo upload
                </h2>
                <div className='mt-4'>
                  <label className='flex flex-col gap-2 items-start'>
                    <span className='font-semibold'>Photo of yourself</span>

                    <input
                      type='file'
                      accept='image/*'
                      onChange={(e) => handleFileChange(e, "profilePhoto")} // Update this line
                      required
                    />
                  </label>
                  {formData.profilePhoto && (
                    <div className='flex items-center gap-2 mt-2'>
                      <img
                        src={URL.createObjectURL(formData.profilePhoto)}
                        alt='Uploaded Photo'
                        className='uploaded-photo w-48 h-56'
                      />
                    </div>
                  )}
                </div>
                <div className='mt-4'>
                  <label className='flex flex-col gap-2 items-start'>
                    <span className='font-semibold'>Photo of your Id</span>
                    <input
                      type='file'
                      accept='image/*'
                      onChange={(e) => handleFileChange(e, "idPhoto")} // Update this line
                      required
                    />
                  </label>
                  {formData.idPhoto && (
                    <div className='flex items-center gap-2 mt-2'>
                      <img
                        src={URL.createObjectURL(formData.idPhoto)}
                        alt='Uploaded Photo'
                        className='uploaded-photo w-48 h-56'
                      />
                    </div>
                  )}
                </div>
              </div>
            )}

            {step === 4 && (
              <section className='flex flex-col justify-center items-center mt-8'>
                {loading && <Loading className='w-12 h-12' />}
                <h2 className='text-lg font-semibold text-left mb-4'>
                  Are you sure to submit your information?
                </h2>

                {/* <p className="self-stretch mt-5 w-full leading-[167%] text-slate-500">
            Are you sure to submit your information?
          </p> */}
              </section>
            )}

            {step === 5 && (
              <section className='flex flex-col justify-center items-center mt-8'>
                <img
                  loading='lazy'
                  src='https://cdn.builder.io/api/v1/image/assets/TEMP/f036dfadbcb5962fc51b133ce1f5e0f003ad5000218eb6b4df54e7ec1cff714a?apiKey=da0e5699a0964f23ab3a2091e7f935a3&'
                  alt='Submit form icon'
                  className='max-w-full aspect-[1.1] w-[157px]'
                />
                <h2 className='text-lg font-semibold text-left mt-4'>
                  A login link has been sent to your email!
                </h2>
              </section>
            )}

            <div className={` ${disableSocials ? "hidden" : ""}`}>
              {/* <Divider> or </Divider> */}
            </div>

            {/* <div className={` ${disableSocials ? "hidden" : ""} flex flex-col gap-2`}>
            <h2 className='text-md font-semibold'>Sign Up with your Socials</h2>
            <div className='flex justify-center items-center gap-4 border border-[#DCDFE4] px-8 rounded-[8px] py-1 cursor-pointer '>
              <Icon icon='devicon:google' />
              <span>Continue with Google</span>
            </div>
            <div className='flex justify-center items-center gap-4 border border-[#DCDFE4] px-8 rounded py-1 cursor-pointer'>
              <Icon icon='devicon:linkedin' />
              <span>Continue with LinkedIn</span>
            </div>
          </div> */}
            <div className='flex justify-between gap-32 mt-4'>
              {step !== 1 && step !== 5 && (
                <Button
                  onClick={handlePrev}
                  className='hover:bg-primary-500 hover:text-white bg-white text-primary-500 border border-primary-500 px-8'>
                  Previous
                </Button>
              )}
              {step <= 3 && (
                <Button
                  onClick={handleNext}
                  className='bg-primary-500 text-white hover:bg-white hover:text-primary-500 hover:border hover:border-primary-500 px-8'>
                  Next
                </Button>
              )}

              {step === 4 && (
                <Button
                  type='submit'
                  onClick={handleSubmit}
                  className={`bg-primary-500 text-white hover:bg-white hover:text-primary-500 hover:border hover:border-primary-500 px-8`}>
                  Submit
                </Button>
              )}
            </div>
          </Form>
        </div>
      </div>
    </div>
  );
};

export default RegistrationScreen;
