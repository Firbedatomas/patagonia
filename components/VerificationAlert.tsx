interface VerificationAlertProps {
    isVerified: boolean;
  }
  
  const VerificationAlert: React.FC<VerificationAlertProps> = ({ isVerified }) => {
    return !isVerified ? (
      <div className="alert alert-danger" role="alert">
        Tu cuenta aún no ha sido verificada...
      </div>
    ) : null;
  }
  
  export default VerificationAlert;
  