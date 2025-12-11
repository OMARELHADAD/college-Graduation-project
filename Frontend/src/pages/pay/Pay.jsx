import React, { useState } from "react";
import "./Pay.scss";
import newRequest from "../../utils/newRequest";
import { useParams, useNavigate } from "react-router-dom";

const Pay = () => {
  const { id } = useParams(); // gigId
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    // Simulate payment processing delay
    setTimeout(async () => {
      try {
        const res = await newRequest.post(`/api/orders/${id}`);
        // Navigate to success page with order details in state
        navigate("/success", { state: { order: res.data } });
      } catch (err) {
        console.log(err);
        setError("Something went wrong. Please try again.");
        setLoading(false);
      }
    }, 2000);
  };

  return (
    <div className="pay-container container mt-5 animate__animated animate__fadeIn">
      <div className="row justify-content-center">
        <div className="col-md-6">
          <div className="card shadow-lg border-0 rounded-3">
            <div className="card-header bg-primary text-white p-4">
              <h3 className="mb-0 fw-bold">Secure Payment</h3>
            </div>
            <div className="card-body p-5">
              <form onSubmit={handleSubmit}>
                <div className="mb-4">
                  <div className="payment-icons mb-3" style={{ display: 'flex', gap: '10px', alignItems: 'center' }}>
                    <span className="text-muted small me-2">We accept:</span>
                    <img src="/img/visa.png" alt="Visa" title="Visa" style={{ height: '30px', width: 'auto', objectFit: 'contain' }} />
                    <img src="/img/mastercard.png" alt="Mastercard" title="Mastercard" style={{ height: '30px', width: 'auto', objectFit: 'contain' }} />
                    <img src="/img/paypal.png" alt="PayPal" title="PayPal" style={{ height: '30px', width: 'auto', objectFit: 'contain' }} />
                    <img src="/img/applepay.png" alt="Apple Pay" title="Apple Pay" style={{ height: '30px', width: 'auto', objectFit: 'contain' }} />
                  </div>
                  <label className="form-label fw-bold">Card Number</label>
                  <div className="input-group">
                    <span className="input-group-text"><i className="bi bi-credit-card-2-front"></i></span>
                    <input type="text" className="form-control form-control-lg" placeholder="0000 0000 0000 0000" required maxLength="19" />
                  </div>
                </div>

                <div className="row mb-4">
                  <div className="col-6">
                    <label className="form-label fw-bold">Expiry Date</label>
                    <input type="text" className="form-control form-control-lg" placeholder="MM/YY" required maxLength="5" />
                  </div>
                  <div className="col-6">
                    <label className="form-label fw-bold">CVC</label>
                    <input type="text" className="form-control form-control-lg" placeholder="123" required maxLength="3" />
                  </div>
                </div>

                <div className="mb-4">
                  <label className="form-label fw-bold">Cardholder Name</label>
                  <input type="text" className="form-control form-control-lg" placeholder="John Doe" required />
                </div>

                {error && <div className="alert alert-danger">{error}</div>}

                <button type="submit" className="btn btn-success btn-lg w-100 py-3 fw-bold shadow-sm" disabled={loading}>
                  {loading ? (
                    <>
                      <span className="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>
                      Processing...
                    </>
                  ) : (
                    "Pay Now"
                  )}
                </button>

                <div className="text-center mt-3 text-muted">
                  <small><i className="bi bi-lock-fill"></i> Payments are secure and encrypted</small>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Pay;
