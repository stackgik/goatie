import SignUpForm from './SignUpForm';

const SignUpPage = () => {
  return (
    <div className='auth-container'>
      <div className='auth-wrapper'>
        <h1 className='auth-wrapper_header'>Getting Started</h1>
        <p className='auth-wrapper_description'>
          Fill this form to register for an account
        </p>
        <SignUpForm />
      </div>
    </div>
  );
};

export default SignUpPage;
