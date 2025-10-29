import { BlurFadeText } from "./partials/blurfade";

export default function ContactUs(){
    return(
        <>
        <div className="text-center" id="contactus">
            <BlurFadeText title="Get in touch" subtitle="contact us"/>
        </div>
        <div className="max-w-2xl mx-auto py-8 px-4" >
      <div className=" sm:p-10">
        {/* <div>
          <h2 className="text-3xl text-slate-900 font-extrabold mb-4">Get In Touch</h2>
          <p className="text-[15px] text-slate-600 leading-relaxed">Have some big idea or brand to develop and need help? We'd love to hear about your project and provide help.</p>
        </div> */}

        <form className="grid sm:grid-cols-2 gap-4 text-slate-900 mt-8">
          <div>
            <input type='text' placeholder='Full Name'
              className="w-full text-white  py-2.5 px-4 text-sm rounded-full border border-gray-500 focus:bg-transparent focus:border-blue-600 outline-none transition-all" />
          </div>
          <div>
            <input type='email' placeholder='Email'
              className="w-full text-white py-2.5 px-4 text-sm rounded-full border border-gray-200 focus:bg-transparent focus:border-blue-600 outline-none transition-all" />
          </div>
          <div className="col-span-full">
            <input type='number' placeholder='Phone No.'
              className="w-full text-white py-2.5 px-4 text-sm rounded-full border border-gray-200 focus:bg-transparent focus:border-blue-600 outline-none transition-all" />
          </div>
          {/* <div className="col-span-full">
            <input type='text' placeholder='Subject'
              className="w-full text-white py-2.5 px-4 text-sm rounded-full border border-gray-200 focus:bg-transparent focus:border-blue-600 outline-none transition-all" />
          </div> */}
          <div className="col-span-full">
            <textarea placeholder='Message' rows={6}
              className="w-full text-white px-4 text-sm rounded-md pt-3 border border-gray-200 focus:bg-transparent focus:border-blue-600 outline-none transition-all"></textarea>
          </div>
          <div className="col-span-full">
            <button type='button'
              className="text-white bg-linear-to-br from-orange-700 to-yellow-900  hover:bg-blue-700 text-sm rounded-md font-medium px-4 py-2.5 cursor-pointer w-full !mt-2">
              <svg xmlns="http://www.w3.org/2000/svg" width="16px" height="16px" fill='currentColor' className="mr-2 inline" viewBox="0 0 548.244 548.244">
                <path fill-rule="evenodd" d="M392.19 156.054 211.268 281.667 22.032 218.58C8.823 214.168-.076 201.775 0 187.852c.077-13.923 9.078-26.24 22.338-30.498L506.15 1.549c11.5-3.697 24.123-.663 32.666 7.88 8.542 8.543 11.577 21.165 7.879 32.666L390.89 525.906c-4.258 13.26-16.575 22.261-30.498 22.338-13.923.076-26.316-8.823-30.728-22.032l-63.393-190.153z" clip-rule="evenodd" data-original="#000000" />
              </svg>
              Send Message
            </button>
          </div>
        </form>
      </div>
    </div>
        </>
    )
}