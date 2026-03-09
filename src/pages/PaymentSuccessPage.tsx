const PaymentSuccessPage = () => (
  <div className="min-h-[80vh] flex items-center justify-center px-4">
    <div className="text-center bg-card border border-border rounded-lg p-12 max-w-md">
      <div className="text-5xl mb-4">✅</div>
      <h1 className="text-2xl font-bold mb-3" style={{ color: "#FFF" }}>Plaćanje uspešno!</h1>
      <p className="text-muted-foreground mb-6">
        Hvala vam na kupovini Aerisafety Senzora. Potvrdni email je poslat na vašu adresu.
      </p>
      <a href="/" className="inline-block px-6 py-3 bg-primary text-primary-foreground font-semibold rounded-lg hover:opacity-90 transition-opacity">
        Nazad na početnu
      </a>
    </div>
  </div>
);

export default PaymentSuccessPage;
