import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Layers, Pencil, Zap } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

export default function Landing() {
  return (
    <main className="mx-auto ">
      <section className="flex  justify-center text-center h-[50vh] sm:[70vh]  ">
        <div className="flex flex-col gap-9 justify-center items-center md:mb-10 sm:mb-10 ">
          <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl lg:text-6xl text-wrap">
            Manage Your Content With Ease
          </h1>
          <p className="text-gray-400 mx-auto max-w-[700px] text-xl ">
            Streamline your workflow and enhance collaboration with our
            intuitive content management system.
          </p>
          <div className="flex gap-6  items-center">
            <Link href={"/signin"} variant={"default"} className="bg-gray-200 p-2 rounded-lg text-black font-semibold px-4">Try it out</Link>
            <Button  variant={"outline"}>Try it out !</Button>
          </div>
        </div>
      </section>

      <section className="flex flex-wrap justify-evenly  content-center  min-h-screen sm:min-h-[50vh] bg-gray-500/10 w-full my-5">
        {/* this suggest that for large device [>1024] we have grid of 4 , for medium device [>768] we have grid of 3 and for small device we have grid of 2 */}
        <div className="max-w-[1440px] mx-auto px-14 md:px-10  ">
          <div className="grid   gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 ">
            <span className="flex flex-col  items-center gap-3 my-3  ">
              <Pencil size={50} />
              <h3>Intuitive Editor</h3>
              <p className="text-center max-w-[300px]" >
                Experience a seamless editing process with our user-friendly
                interface.
              </p>
            </span>
            <span className="flex flex-col items-center gap-3 my-3">
              <Layers size={50} />
              <h3>Layered Structure</h3>
              <p className="max-w-[300px] text-center">
                Experience a seamless editing process with our user-friendly
                interface.
              </p>
            </span>
            <span className="flex flex-col items-center gap-3 my-3">
              <Zap size={50} />
              <h3>Real-time Collaboration</h3>
              <p className="max-w-[300px] text-center">
                Experience a seamless editing process with our user-friendly
                interface.
              </p>
            </span>
          </div>
        </div>
      </section>

      <section className="mb-4  ">
        <div className="max-w-[1440px] mx-auto ">
          <div className="flex flex-col items-center justify-center gap-4 px-20  ">
            <h2 className="text-xl font-bold text-center tracking-tighter  sm:text-4xl  lg:text-6xl text-wrap">
              Ready To Transform Your Content Journey ?
            </h2>
            <p className="text-gray-500 max-w-[800px] text-center text-xl my-3  lg:text-2xl">
              Join us today and experience the future of content management.
            </p>
            <div className="flex flex-col sm:flex-row items-center gap-4">
              <Input
                type="email"
                placeholder="Enter your email"
                className="w-[250px] sm:w-[300px] md:w-[400px]"
              />
              <Button    >Get Started</Button>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
