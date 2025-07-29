import SignInForm from './(auth)/sign-in/SignInForm';

const Home = () => {
  return (
    <div className='h-screen flex items-center justify-center'>
      <div className='w-full max-w-[500px]'>
        <h1 className='text-2xl font-semibold text-center mb-2'>Sign In</h1>
        <p className='text-sm text-center text-gray-700'>
          Sign in to your account
        </p>
        <SignInForm />
      </div>
    </div>
  );
};

export default Home;
