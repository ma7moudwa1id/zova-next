import SignUpform from "../components/SignUp.form";
import SignUpImage from "../components/SignUp.Image";

export default function SignUpScreen() {
  
  return (
    <>
      <section className="py-10 md:py-20 px-4">
        <div className="container flex overflow-hidden rounded-2xl shadow-lg">
          <SignUpform />
          <SignUpImage />
        </div>
      </section>
    </>
  );
}
