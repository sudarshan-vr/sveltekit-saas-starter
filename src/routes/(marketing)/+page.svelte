<script lang="ts">
  import {
    WebsiteName,
    WebsiteBaseUrl,
    WebsiteDescription,
  } from "./../../config"
  import SEO from "$lib/components/SEO.svelte"

  const ldJson = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: WebsiteName,
    url: WebsiteBaseUrl,
    description: WebsiteDescription,
    potentialAction: {
      "@type": "SearchAction",
      target: `${WebsiteBaseUrl}/?q={search_term_string}`,
      "query-input": "required name=search_term_string"
    }
  }
  const jsonldScript = `<script type="application/ld+json">${
    JSON.stringify(ldJson) + "<"
  }/script>`

  const features = [
    {
      name: "Hosting & Domain",
      link: "https://app.craftuary.com/order/web-hosting-domain-registration",
      description:
        "Reliable & fast hosting solutions and easy domain management for your website.",
      svgContent: `<path d="M22 12C22 17.5228 17.5228 22 12 22C6.47715 22 2 17.5228 2 12C2 6.47715 6.47715 2 12 2C17.5228 2 22 6.47715 22 12Z" stroke="#1C274C" stroke-width="1.5"/>
<path d="M12 2C14.5013 4.73835 15.9228 8.29203 16 12C15.9228 15.708 14.5013 19.2616 12 22" stroke="#1C274C" stroke-width="1.5" stroke-linecap="round"/>
<path d="M12 2C9.49872 4.73835 8.07725 8.29203 8 12C8.07725 15.708 9.49872 19.2616 12 22" stroke="#1C274C" stroke-width="1.5" stroke-linecap="round"/>
<path d="M2 12H22" stroke="#1C274C" stroke-width="1.5" stroke-linecap="round"/>`,
    },
    {
      name: "Themes",
      link: "/themes",
      description:
        "Thousands of ready-to-use free themes and CMS templates to browse, preview, and deploy.",
      svgContent: `<path d="M2 12C2 7.28595 2 4.92893 3.46447 3.46447C4.92893 2 7.28595 2 12 2C16.714 2 19.0711 2 20.5355 3.46447C22 4.92893 22 7.28595 22 12C22 16.714 22 19.0711 20.5355 20.5355C19.0711 22 16.714 22 12 22C7.28595 22 4.92893 22 3.46447 20.5355C2 19.0711 2 16.714 2 12Z" stroke="#1C274C" stroke-width="1.5"/>
<path d="M2 8H22" stroke="#1C274C" stroke-width="1.5" stroke-linecap="round"/>
<path d="M17.5 15.5L15 18L12.5 15.5" stroke="#1C274C" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
<path d="M7 12L9 14.5L11 12" stroke="#1C274C" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>`,
    },
    {
      name: "Documentation",
      link: "/blog",
      description:
        "Comprehensive guides and tutorials to help you get started.",
      svgContent: `<path d="M3 10C3 6.22876 3 4.34315 4.17157 3.17157C5.34315 2 7.22876 2 11 2H13C16.7712 2 18.6569 2 19.8284 3.17157C21 4.34315 21 6.22876 21 10V14C21 17.7712 21 19.6569 19.8284 20.8284C18.6569 22 16.7712 22 13 22H11C7.22876 22 5.34315 22 4.17157 20.8284C3 19.6569 3 17.7712 3 14V10Z" stroke="#1C274C" stroke-width="1.5"/>
<path d="M6 12C6 10.5858 6 9.87868 6.43934 9.43934C6.87868 9 7.58579 9 9 9H15C16.4142 9 17.1213 9 17.5607 9.43934C18 9.87868 18 10.5858 18 12V16C18 17.4142 18 18.1213 17.5607 18.5607C17.1213 19 16.4142 19 15 19H9C7.58579 19 6.87868 19 6.43934 18.5607C6 18.1213 6 17.4142 6 16V12Z" stroke="#1C274C" stroke-width="1.5"/>
<path d="M7 6H12" stroke="#1C274C" stroke-width="1.5" stroke-linecap="round"/>`,
    },
    {
      name: "Pricing",
      link: "/pricing",
      description:
        "Pricing plans designed to fit every budget and need.",
      svgContent: `<path d="M12 6V18" stroke="#1C274C" stroke-width="1.5" stroke-linecap="round"/>
<path d="M15 9.5C15 8.11929 13.6569 7 12 7C10.3431 7 9 8.11929 9 9.5C9 10.8807 10.3431 12 12 12C13.6569 12 15 13.1193 15 14.5C15 15.8807 13.6569 17 12 17C10.3431 17 9 15.8807 9 14.5" stroke="#1C274C" stroke-width="1.5" stroke-linecap="round"/>
<path d="M7 3.33782C8.47087 2.48697 10.1786 2 12 2C17.5228 2 22 6.47715 22 12C22 17.5228 17.5228 22 12 22C6.47715 22 2 17.5228 2 12C2 10.1786 2.48697 8.47087 3.33782 7" stroke="#1C274C" stroke-width="1.5" stroke-linecap="round"/>`,
    },
    {
      name: "Blogs",
      link: "/blog",
      description:
        "Learn from the blogs across various topics, such as Green Tech, DIY Tips, Internet, and more.",
      svgContent: `<path d="M20.5 16.9286V10C20.5 6.22876 20.5 4.34315 19.3284 3.17157C18.1569 2 16.2712 2 12.5 2H11.5C7.72876 2 5.84315 2 4.67157 3.17157C3.5 4.34315 3.5 6.22876 3.5 10V14C3.5 17.7712 3.5 19.6569 4.67157 20.8284C5.84315 22 7.72876 22 11.5 22H12.5" stroke="#1C274C" stroke-width="1.5" stroke-linecap="round"/>
<path d="M20.5 22L20.5 16M20.5 16L18 18.5M20.5 16L23 18.5" stroke="#1C274C" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
<path d="M8 7H15" stroke="#1C274C" stroke-width="1.5" stroke-linecap="round"/>
<path d="M8 12H15" stroke="#1C274C" stroke-width="1.5" stroke-linecap="round"/>`,
    },
    {
      name: "AI Tools",
      link: null,
      description:
        "AI-powered features to enhance your content creation. Coming soon!",
      svgContent: `<path d="M9 4.45962C9.91153 4.16968 10.9104 4 12 4C16.1819 4 19.028 6.49956 20.7251 8.70433C21.575 9.80853 22 10.3606 22 12C22 13.6394 21.575 14.1915 20.7251 15.2957C19.028 17.5004 16.1819 20 12 20C7.81811 20 4.97196 17.5004 3.27489 15.2957C2.42496 14.1915 2 13.6394 2 12C2 10.3606 2.42496 9.80853 3.27489 8.70433C3.75612 8.07914 4.32973 7.43025 5 6.82137" stroke="#1C274C" stroke-width="1.5" stroke-linecap="round"/>
<path d="M15 12C15 13.6569 13.6569 15 12 15C10.3431 15 9 13.6569 9 12C9 10.3431 10.3431 9 12 9C13.6569 9 15 10.3431 15 12Z" stroke="#1C274C" stroke-width="1.5"/>`,
    }
  ]
</script>

<SEO 
  title="The Craftuary® Global | Try Craftuay® Now"
  description="Affordable themes, domains, and hosting to launch stunning websites fast. Perfect for creators, startups, and businesses."
  image="https://www.craftuary.com/images/logo.svg"
  url={WebsiteBaseUrl}
  type="website"
/>

<svelte:head>
  <!-- eslint-disable-next-line svelte/no-at-html-tags -->
  {@html jsonldScript}
</svelte:head>

<div class="hero min-h-[60vh]">
  <div class="hero-content text-center py-12">
    <div class="max-w-xl">
      <div
        class="text-xl md:text-3xl font-bold bg-clip-text text-transparent bg-linear-to-r from-primary to-accent mb-3 md:mb-7 pb-1"
      >
        Your online success starts here
      </div>

      <div
        class="text-4xl md:text-6xl font-bold px-2"
        style="line-height: 1.2;"
      >
        The 
        <span 
          class="underline decoration-secondary decoration-4 md:decoration-[6px]"
          >Simple</span
        >,
        <span
          class="underline decoration-secondary decoration-4 md:decoration-[6px]"
          >Fast</span
        >, and
        <span
          class="underline decoration-secondary decoration-4 md:decoration-[6px]"
          >Affordable</span
        >
        <span>way to build</span>
        <span
          class="underline decoration-secondary decoration-4 md:decoration-[6px]"
          > Websites</span
        >
      </div>
      <div class="mt-6 md:mt-10 text-sm md:text-lg">
         Free-to-host <a
          href="https://app.crafruary.com"
          class="link font-bold"
          target="_blank">templates</a
        >,
        <a href="https://app.craftuary.com" class="link font-bold" target="_blank"
          >domains</a
        > and
        <a href="https://app.craftuary.com" class="link font-bold" target="_blank"
          >hosting</a
        >.
        
        
      </div>
      <div
        class="mt-6 md:mt-4 flex flex-row flex-wrap gap-4 place-content-center"
      >
        <a href="https://app.craftuary.com">
          <button class="btn btn-primary px-6">Start Now</button>
        </a>
        <a
          href="/#features"
        >
          <button class="btn btn-outline btn-primary px-6">Explore</button
          >
        </a>
      </div>
    </div>
  </div>
</div>
<div class="min-h-[60vh]">
  <div id="features" class="pt-20 pb-8 px-7" >
    <div class="max-w-lg mx-auto text-center">
      <div
        class="text-3xl md:text-5xl font-bold bg-clip-text text-transparent bg-linear-to-r from-primary to-accent pb-2"
      >
        Explore the Features
      </div>
      <div class="mt-4 text-xl font-bold">
        The unified tools for
        <span
          class="underline decoration-secondary decoration-[3px] md:decoration-[4px]"
        >
          Modern Web Creation
        </span>
      </div>
    </div>

    <div
      class="flex gap-6 mt-12 max-w-[1064px] mx-auto place-content-center flex-wrap"
    >
      {#each features as feature}
        <div class="card bg-white w-[270px] min-h-[300px] flex-none shadow-xl">
          <div class="card-body items-center text-center p-[24px] pt-[32px]">
            <div>
              <svg
                width="50px"
                height="50px"
                class="mb-2 mt-1"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <!-- eslint-disable-next-line svelte/no-at-html-tags -->
                {@html feature.svgContent}
              </svg>
            </div>
            <h2 class="card-title">
              {feature.name}
            </h2>
            <p class="text-sm">
              {feature.description}
            </p>
            {#if feature.link}
              <a
                href={feature.link}
                class="pb-4"
              >
                <button
                  class="btn btn-xs btn-outline rounded-full btn-primary min-w-[100px]"
                  >Try It</button
                >
              </a>
            {/if}
          </div>
        </div>
      {/each}
    </div>
  </div>
</div>
<div class="hero min-h-[60vh] mt-12">
  <div class="hero-content text-center pb-16 pt-4 px-4">
    <div class="max-w-lg">
      <div
        class="text-3xl md:text-5xl font-bold bg-clip-text text-transparent bg-linear-to-r from-primary to-accent mt-4 pb-2"
      >
        2025 Best Free Web Templates & Unlimited Downloads.
      </div>
      <div
        class="flex flex-col lg:flex-row mt-6 gap-6 place-content-center content-center"
      >
        <div class="hidden md:block">
          <a href="https://www.craftuary.com/themes" target="_blank" class="link">
            <div class="mockup-browser border">
              <div class="mockup-browser-toolbar">
                <div class="input" style="background:#eee;">
                  https://www.craftuary.com/themes
                </div>
              </div>
              <div class="flex justify-center">
                <img
                  alt="Screenshot of Themes & Templates"
                  class="aspect-2044/1242"
                  src="/images/example-home.png"
                />
              </div>
            </div>
          </a>
        </div>
        <div class="md:hidden">
          <a href="https://www.craftuary.com/themes" target="_blank" class="link">
            <div class="card shadow-xl border overflow-hidden">
              <img
                alt="Screenshot of Themes & Templates homepage"
                class="aspect-2044/1242"
                src="/images/example-home.png"
              />
            </div></a
          >
        </div>
        <div class="min-w-[270px] lg:min-w-[420px] flex mt-6 lg:mt-0">
          <div class="my-auto">
            <div class="px-4 text-lg md:text-xl">
              <a href="https://www.craftuary.com/themes" class="" target="_blank"
                ><span
                  class="font-bold whitespace-nowrap">Craftuary Themes </span
                > offers pre-built, fully customizable website templates to design, deploy, and scale websites with little to, <span class="underline decoration-secondary decoration-[3px]"
                  >no coding needed.</span
                > 
                </a
              >
            </div>
            <div class="px-4 mt-6 text-lg md:text-xl">
              <a
                href="https://www.craftuary.com/themes"
                class="link font-bold"
                target="_blank">Check out</a
              > our live examples.
            </div>
            <div class="mt-4 text-large">
              <a href="https://www.craftuary.com/themes" target="_blank">
                <button class="btn btn-primary btn-wide mt-3"
                  >See it in Action</button
                >
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</div>
