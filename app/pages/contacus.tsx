import { BlurFadeText } from "./partials/blurfade";

export default function ContactUs() {
  return (
    <>
      <div className="text-center" id="contactus">
        <BlurFadeText title="Get in touch" subtitle="contact us" />
      </div>
      <div className="max-w-2xl mx-auto py-8 px-4">
        <div className=" sm:p-10">
          <form className="grid sm:grid-cols-2 gap-4 text-slate-900 mt-8">
            <div>
              <input
                type="text"
                placeholder="Full Name"
                className="w-full text-white  py-2.5 px-4 text-sm rounded-full border border-gray-500 focus:bg-transparent focus:border-blue-600 outline-none transition-all"
              />
            </div>
            <div>
              <input
                type="email"
                placeholder="Email"
                className="w-full text-white py-2.5 px-4 text-sm rounded-full border border-gray-200 focus:bg-transparent focus:border-blue-600 outline-none transition-all"
              />
            </div>
            <div className="col-span-full">
              <input
                type="number"
                placeholder="Phone No."
                className="w-full text-white py-2.5 px-4 text-sm rounded-full border border-gray-200 focus:bg-transparent focus:border-blue-600 outline-none transition-all"
              />
            </div>
            {/* <div className="col-span-full">
            <input type='text' placeholder='Subject'
              className="w-full text-white py-2.5 px-4 text-sm rounded-full border border-gray-200 focus:bg-transparent focus:border-blue-600 outline-none transition-all" />
          </div> */}
            <div className="col-span-full">
              <textarea
                placeholder="Message"
                rows={6}
                className="w-full text-white px-4 text-sm rounded-md pt-3 border border-gray-200 focus:bg-transparent focus:border-blue-600 outline-none transition-all"
              ></textarea>
            </div>
            <div className="col-span-full">
              <button
                type="button"
                className="text-white bg-linear-to-br from-orange-700 to-yellow-900  hover:bg-blue-700 text-sm rounded-md font-medium px-4 py-2.5 cursor-pointer w-full !mt-2"
              >
            
                Send Message
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}
