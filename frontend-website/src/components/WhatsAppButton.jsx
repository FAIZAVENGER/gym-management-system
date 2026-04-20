function WhatsAppButton() {
  const phoneNumber = "919876543210"; // Replace with your number
  const message = "Hi! I'm interested in joining Fitness Pro Gym. Can you help me?";
  
  const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;
  
  return (
    <a
      href={whatsappUrl}
      className="whatsapp-btn"
      target="_blank"
      rel="noopener noreferrer"
      style={{
        position: 'fixed',
        bottom: '20px',
        right: '20px',
        backgroundColor: '#25D366',
        color: 'white',
        width: '60px',
        height: '60px',
        borderRadius: '50%',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        fontSize: '30px',
        textDecoration: 'none',
        boxShadow: '0 4px 10px rgba(0,0,0,0.3)',
        zIndex: 1000,
        transition: 'transform 0.3s'
      }}
      onMouseEnter={(e) => e.target.style.transform = 'scale(1.1)'}
      onMouseLeave={(e) => e.target.style.transform = 'scale(1)'}
    >
      💬
    </a>
  );
}

export default WhatsAppButton;