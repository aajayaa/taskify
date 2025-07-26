import './Toast.css';

const Toast = ({ message, onClose }) => {
  if (!message) return null;

  setTimeout(onClose, 3000); // auto-close after 3s

  return (
    <div className="toast">
      {message}
    </div>
  );
};

export default Toast;
