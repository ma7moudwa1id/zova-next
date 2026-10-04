import SignInform from "../components/SignIn.form";
import SignInImage from "../components/SignIn.Image";

export default function SignInScreen() {
  return (
      <>
        <section className="py-10 md:py-20 px-4">
          <div className="container flex overflow-hidden rounded-2xl shadow-lg">
            <SignInform />
            <SignInImage />
          </div>
        </section>
      </>
    );
}
