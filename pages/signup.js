import AuthForm from '../components/AuthForm';

export default function Signup() {
  return (
    <div className="container d-flex flex-column align-items-center justify-content-center min-vh-100">
      <h1 className="mb-4 text-primary">Sign Up</h1>
      <div className="card shadow p-4" style={{ width: '100%', maxWidth: '400px' }}>
        <AuthForm type="signup" />
      </div>
    </div>
  );
}