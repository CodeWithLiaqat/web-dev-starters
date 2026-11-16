import { ContactForm } from "@/components/ContactForm";
import { JsonLd } from "@/components/JsonLd";
import { site } from "@/lib/site";

export default function Home() {
  return (
    <main>
      <JsonLd data={{ "@context": "https://schema.org", "@type": "Organization", name: site.name, url: site.url, email: site.email, telephone: site.phone }} />
      <h1>{site.name}</h1>
      <p>{site.description}</p>
      <h2>Contact</h2>
      <ContactForm />
    </main>
  );
}
