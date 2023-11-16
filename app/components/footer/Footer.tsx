import Container from "../Container";
import FooterList from "./FooterList";
import Link from "next/link";
import { MdFacebook } from "react-icons/md";
import { AiFillTwitterCircle, AiFillInstagram, AiFillYoutube } from "react-icons/ai";

const Footer = () => {
  return (
    <footer className="bg-slate-700 text-slate-200 text-sm mt-16">
      <Container>
        <div className="flex flex-col md:flex-row justify-between pt-16 pb-8 pr-2">
            <FooterList>
                <h3 className="font-bold text-base mb-2">Shop Categories</h3>
                <Link href="/">All Products</Link>
                <Link href="/">Comics</Link>
                <Link href="/">Prints</Link>
                <Link href="/">Digitals</Link>
                <Link href="/">Apparel</Link>
            </FooterList>
            <FooterList>
                <h3 className="font-bold text-base mb-2">Customer Service</h3>
                <Link href="/">Contact Us</Link>
                <Link href="/">Shipping Policy</Link>
                <Link href="/">Return Policy</Link>
                <Link href="/">FAQs</Link>
            </FooterList>
            <div className="w-full md:w1/3 mb-6 md:mb-0">
                <h3 className="font-bold text-base mb-2">About Mr. Fish</h3>
                <p className="mb-2 max-w-md">
                    Mr. Fish a.k.a. The fastest man in indie comics is please to bring you his online store. Here you can find all of his comics, prints, posters, and apparel. We appricate your visit and hope you enjoy the content. Please reach out to us with any questions or concerns because we do have unwavering dedication to customer satisfation. Also, feel free to follow Mr. Fish on your favorite social media platform!
                </p>
                <p>&copy; {new Date().getFullYear()} Mr. Fish Comics. All rights reserved</p>
            </div>
            <FooterList>
                <h3 className="font-bold text-base mb-2">Follow Us</h3>
                <div className="flex gap-2">
                    <Link href="/"><MdFacebook size={24} /></Link>
                    <Link href="/"><AiFillTwitterCircle size={24} /></Link>
                    <Link href="/"><AiFillInstagram size={24} /></Link>
                    <Link href="/"><AiFillYoutube size={24} /></Link>
                </div>
                
            </FooterList>
        </div>
      </Container>
    </footer>
  );
}
export default Footer;