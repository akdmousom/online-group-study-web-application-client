import  { useRef } from 'react';
import emailjs from '@emailjs/browser';
import toast from 'react-hot-toast';

export const ContactUs = () => {
  const form = useRef();

  const sendEmail = (e) => {
    e.preventDefault();

    emailjs.sendForm('service_5ebs8vc', 'template_9kkvwta', form.current, 'RHhCmEJhhbI1ZBnjM')
      .then((result) => {
          if (result) {

            form.current.reset()

            toast.success("Email Send Successfully")
            
          }
      }, (error) => {

      });
  };

  return (
    // <form ref={form} onSubmit={sendEmail}>
    //   <label>Name</label>
    //   <input type="text" name="user_name" />
    //   <label>Email</label>
    //   <input type="email" name="user_email" />
    //   <label>Message</label>
    //   <textarea name="message" />
    //   <input type="submit" value="Send" />
    // </form>

    <div className="hero min-h-screen bg-base-200">
  <div className="hero-content flex-col lg:flex-row-reverse">
    <div className="text-center lg:text-left">
      <h1 className="text-5xl font-bold">Contact Us</h1>
      <p className="py-6">We are happy to help you. If you have any question please contact us.</p>
    </div>
    <div className="card shrink-0 w-full max-w-sm shadow-2xl bg-base-100">
      <form ref={form} onSubmit={sendEmail} className="card-body">
        <div className="form-control">
          <label className="label">
            <span className="label-text">Name</span>
          </label>
          <input type="text" placeholder="Name" className="input input-bordered" required />
        </div>
        <div className="form-control">
          <label className="label">
            <span className="label-text">Email</span>
          </label>
          <input type="email" placeholder="Email" className="input input-bordered" required />
        </div>
        <div className="form-control">
          <label className="label">
            <span className="label-text">Message</span>
          </label>
          <textarea name="message" required />
        </div>
        <div className="form-control mt-6">
          <button type='submit' className="btn btn-primary">Send</button>
        </div>
      </form>
    </div>
  </div>
</div>
  );
};