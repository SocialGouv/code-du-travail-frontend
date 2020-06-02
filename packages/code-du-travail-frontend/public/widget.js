function addWidget() {
  const target = document.querySelector("#cdtn-widget");
  let iframe = document.getElementById("iframe");
  if (!iframe) {
    iframe = document.createElement("iframe");
    target.insertAdjacentElement("afterbegin", iframe);
  }
  const isIE = /MSIE/.test(window.navigator.userAgent);
  iframe.id = "cdtn-iframe";
  iframe.width = "100%";
  iframe.style = "border:none";

  iframe.src = isIE
    ? `javascript:
<script>
  window.onload = function() { document.domain = "domain.io"}
</script>`
    : "about:blank";

  const widget = `
<div id="root" style="padding:2em 1.4em; background:#fff; font-size: 1em; line-height:1.625; color: #3e486e; max-width: 31em;">
  <style>
    html, body {
      margin: 0;
    }
    @font-face {
      font-family: "Merriweather";
      src: url(data:font/woff;charset=utf-8;base64,d09GMgABAAAAAAr4AA4AAAAAFHwAAAqiAAEAAAAAAAAAAAAAAAAAAAAAAAAAAAAAGj4bhAYcg1YGYACBfhEICpN0kCELWgABNgIkA4EoBCAFhHIHIBtUEVFUk35IppGycP5+EPDfps3bBZLsQlSJakVtgYoRVdoTI3dOeu41FeTE5KuW/YFd/qsmNfypqRM7Y5I/DP//c682+beEIEwrXGurVHLfKyQ3r5T20yswDUGicLNTVWNQm/1KDf38hLPTO35Ww1k2pEfViRglF9F/Z1oMAZiLQ18kTMtVBBYiZHQUidHJZEZnk7M+j0JkpAfSl4HCRO5HHjt+qkZ01X2dzWQ0O12tlGEoskvXZzeCHDAEHcHXShgxtTg7m8i5BDW11CuyoSqEKZppi74MbkEwhsVgzEKOpYQLOwCAAmEQ9+FppDOWyczEzkIqqecP/qMVl+MbN0+ygpd4g928x0rWs5XdHOQ4Z7mMl8/4hp90Z4TokH4WwbKP5itvhFSIUHmC4hpmpZQIyDLXZISwRgf83+7qjC3+M4P/aMSFyiNWuUItW4xwLXFBt5u7rs1d5dktvepSaYaj1BalBpC1LkuegEkaKJ102MRON59GYhhF5AnipQBuD9LPYqVCOLHEBnmTWYUmXWefgMYviWCwBhYJwc/VewkyMI6aP85KwZjZmpW+U0bNd6KHa6OSJmqzp4jZWkL6jPTLBD/iDYTEG1FM02Qz/IqCMGOpqmppZ+alVHNbVTNzYTFUQ6Nsh88viTWZJBh5Ask4bCCYSBbzzoG26q2XMZNKmcbsCgTLWTxByETVp/OJqJGBs5EZu00GHg39CslrtehiWSZ1E2clCii89eeR32ycdjJp4vS3RDUYZgiLLjYVNzMG6UXxQheTJY8015pyWyEWUyGmTWGPkf24FSlocBieM0cbY+Uo3JbkT3r/xg5DvoiwIl5PHpUKpZ/zC9nDG0U3BhFt4DdPEVbpWzNWxqDhpIYGlnM/3/Irf/I/t4RJDBZjhU0sEPfLInWErvNxTbVabZbf8Mu39MKbcPBu/Vv9iL5VX6mv1D8GfQP71/Xe7f2k93rv2d6TvRvv5n37uT4Cw7r4DhX0pT8DGQw+NYIoYogjkSSSScVKOlkEfTLxu1M9lATiySRjVug6YcZQhMOblQ7Sk8VkN/BXxwvsqDknkHT997L55hA8kWdiQsumNcKqabkhcfo7ZIVnKSmWuBCL2Ww2qQMzQ83JljhLUllaVkS4JdhkMn3r94vuQEDtsfXTFPtrfsXj9eL2+dSeC4WOcdrKvju9SpOmKQvC5il2u8GGWTgCAYfo3n5e8XgHVrweCKg9Ph+SysqTime9EGu9iscvfIFC4fHivqb6/OwP7yfswqFmG1RW7lS0lI0zgUCh/BqLBtXHvRmfzR1vLv8hgcLitV5lwdvC36SXaV9vFt1H1J5NuA8qilaQnS/V5vwFylpSAsN9HnDY1nr7LnQY7Q4Le8dMkJfelPgDZXQXb7i83odkQxET5G7/YcXjzXs3GOBA4oVbvHLS3FzQ542WuL1tn/82ILr9bTL/Do+ezrHRHMtYjLXF2/WdN0969Zzak3fU6RCOgWseAu+kCfk1vv7zK8PTN8YhvzysqW/fWKyM4bXVikfr9tMcr/rUniui+/D5yesVvl0xKPYXlYsrNu3rl33OVz/d81V/ofquC1kRr++Jez3p7UCcalNRJPe7q9SeQG7KWq/y7XohDrakWx7fnyOS27dvPFjVD8+W1OSVO5XFKto829D/NpWxc5X5/RdoirAUV2tVjnGauaTO8dV4fdzXfn+iwzZUWeywbfT2veUvcdgG3q/+aQeqyluLZ2xwtS/a8PHi2mlNccaQHWPiH/58bHjFyKqJA5+tWlz+Zs38Kf26y/KdP8c9O3LF4NHmCtK3bTBmXB0drrb90N3dGHlhjWP3sa5UP2qgK/A/784djxIiuYtAmkp0Dj5lpxWECmPSmbSsWLOWLzsZSIjDou5mU8rY4vTk14XWiK1rmpotCoVFACfcKrSa3gVZ9tGDUvOks3ZXufM241jJB43w2/OQkLSwyI35AnlytJV0au69KCq5sFufxrQaM6x06zd3SI55cLeYxKLqarRE35KLlOf0SGNnEx28s208bVUWvQuYZPFqjS3DoRwGjftMRNaR5GeCrKEhrA0JuHyWL1r2NsWZcqVSXaDX3QRcPssXLYsU6foy1Y23IKr4dabD6z8KxwrDgmk21fo+ieOz3qY6NaU68xb6tSzJcqK8YcOJJTG4YhxO5HiLesjECjPN8Ve7UGKwC4nyjOAYF+oddaOLxsf2kB8VR0weFhsY7UJ9oswuQTov8wQePZV2vbfFhXoJtXdjcMU4HDNznY1dpQqjTRRanhlkd5K8pa4Ha70tG7j0NNr33lYX6g31AvitcYN72Oz9+s0fVBA3uIfV3q/f/EExL+LaWlusAxPs8W2tLfaB8RB32T5mYFpOUHdHNKOqxo0KpGLcpsTiirE4atZeyBUoteVqbc8i9ilzhG/PhkFkUnHP3o3pdWZQHWp2W4im3c1kSbUVOm2fwiz7yEEpeZqPzZH3ba4iIpTzgda7YBOZWNijT0N6sxkexDsuj8EVI3E0zRdNwibI0/hi/yOtlS/8MqIltf2cxRIYmTLPFEhXF7BCA88NTSSiUy18mbmQrhbaPOeW9dH7xRWIIwU1ZPix7SXKrnaW0CSKb8+ppOpDwgaYYZ5rh3FArMB0u/PHqPaAjEAtMn65ZblU3dREhJo8A9+01Ufx4brL0mASyilJUVJFB9mfP9oD4eVofEzrOGx71LTeMd786R5Iww+dx7bhoQDcF6Joj8oITj9ar0qa1UN0WqQ78C3rxLczMPEVXqyfv1LDGGnTe7hwWqbhKw8mcIeajUCO+0xE1pHkZ4KsoSPgMiXDmBR3NMaw4KgJgaS1848lGM0ju5YAXKaqkyemSIZN/wsOm/VDp6dKNpUnpQGQgAIABjykDQBIcAQADDgIDgAkOP6BC3YAXBtyELo/GzwbcmB5fZY/W/gxwCcRADD6B9al/NmCSAbECkco/BVROF8Ef/Z5jAZP+0lHHZXM3ghR/7+iddhVEPz/igZhXW9RncBLR75jXWt3AhcAsWNdvVIs2FrQYXayj2CnsK7oRfuadkjwok4QASBbsa6g/P8VOeMo9Eg0S4MSHow6YTdehMLgCYI+l0q8dV9dnLEXNAvXgpoN4kHhXQb/i/v3wXGcQ8RGONtgaJUzy+tYjsf+xf076jjOitHwaDZWCtnwFgAdC1GnylsARykQVGwCLhoJvKaQJOCqSBQDSU7BHkNUOA/SG4lLKX6UixTJSYE4T6kTe5MBlV8nTbqXrJIDdV0qIPWRoB/S5+vb9U59V6OPV4SdIKoxdoEMQW8wtfbjKkMICGUaUXkE8ZIjXyJUZOTLDBdl+QbyRGu+kUTxWr6JPLH180PpKz5hDG20cx+dNFBHPS6sVFBGOf1pWqOeGjKmEXVmG/cI6cSVZHRKYyY8bTQSVZnJUSzLUNuMLkl5fK9y0U4XgymllDoaNp+6jEpKqKKNFkoZRyU1tDLH6N410UArpVVSviUt7mHBNypZQ1fi9HJqqJZyPG1vvhpmp+OkpQOXlyHvLIMSF3n/dHUsoxknnVRQQhllVDCEOWiMwcoQs4sVy9McwpPogF3twg6cb63wrFTSMuCcZBdVYrodF10bZJXNlAzz7jpKmcF4pr6x6Iu76buoYA8A) format("woff2");
      font-weight: 300;
      font-style: normal;
    }

    #button-search {
      opacity: 1;
    }

    #button-search:hover {
      opacity: 0.5;
      transform: translateY(-2px);
    }

    @media (max-width: 33.5em) {
      #logo {
        height: 16px !important;
      }
    }
  </style>
  <strong style="font-family: Merriweather; font-weight: 300; font-size: 1em;">
    Code du travail numérique
  </strong>
  <form target="_blank" action="https://code.travail.gouv.fr/recherche">
    <label for="cdtn-search" style="font-family:Merriweather; font-size:1.125em; display: block; margin: .5em 0 1em">
      Trouvez les réponses à vos questions en droit du travail
    </label>
    <div
      style=" display: flex; position: relative; width: 100%; align-items: center; justify-items: flex-start; box-shadow: rgba(121, 148, 212, 0.4) 0px 1rem 2rem; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif, 'Apple Color Emoji', 'Segoe UI Emoji', 'Segoe UI Symbol'; background: rgb(255, 255, 255); border-radius:0.6rem;">
      <img id="logo" style="height: 20px; left: 1em;position: absolute;"
        src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAG0AAAAoCAMAAADDs4S7AAAAw1BMVEX///////9wcMFAQKxgYLrv7/j0oKXpQEvwgIcAAJFAQK373+HlIC3hAA/sYGkQEJivr9z2sLS/v+P0n6X4wMPjEB4gIJ/f3/LucHifn9blHy3ykJb97/D5+fnm5ubg4ODz8/Ovr93a2dmcm5vBwcGQkM/t7e2ura27u7vnMDzT09P3v8MwMKWgoNbqUFpvb8F/f8ggIJ4fH55QULSAgMi/v+SPj8/f3/HPz+tQULNfX7rrUFr4v8PPz+r5z9Lzn6X2r7SE0oVPAAAAAnRSTlP/n4UHvp8AAAHaSURBVHgBvdZVgqswGIbhbyCpt6EGp+7u7rL/VZ3AuPwjTeh7gVw9aBLcswfAMP8Y43hXIPjLQlIzw38rwvGhaCz+qxJ/1oSFzyX90lL4orRPGsPnMomsP5rtQHan9yYcfFk0+M8HLQcqH7QIqJI+PEkHVFH9WgR0+btqBe2aDbqi/vfGCapUrlTz2rUaoZXrjWZWu9YitHanW9L/JBnxILuNMnraNRNE/SoGOrRhamSTn8m7xurahLO3pyPQRbOq2hQz+VMzxuYRIU8X33IhRW2Kpdys1jWLA6mZMHJL0CXUtPWmFranw8WytYIbh9qD/E6ztyvhDvubqdwJ5kC2cUCmpk2XciNqHECKzcJi5NR2goMqrfQH2Mt3g1VuRv/eXkUlbeZtd3jK/RNEDnRB9b97x3nNgVMzhk9r5A2o1Eeu/dZwv5Cd3ITFGsBqDaqYqiZ2j7vHuwT4ciI3hvX+nw4eCsdoUe+aa5drsV1KgrMJMTpq1Gy2tjiwnYWn9HJEVRPMcp+me1PbXC5nykP6balqE74a7kV4yremCHsNOb2MVNVOS+8b2bbE80f6HsNAo2YPvV2EPZ1HUvjQWUGjUMqSXbR/k7TlFr3E/qQZkR9bSIvuEvpl14f/nSicEPXggsEAAAAASUVORK5CYII=" />
      <input name="q" autocomplete="off" type="text" id="cdtn-search" placeholder="Votre recherche"
        aria-label="Votre recherche" aria-describedby="button-search"
        style="color: #3e486e; box-sizing: border-box; border-radius:0.6rem; padding: 2em 3.5em 2em 5em; height: 3em; width:100%; font-weight: 300; font-size: 1em; font-family: inherit; font-style: normal; line-height: inherit; margin: 0px; -webkit-appearance: none; border-width: 1px; border-style: solid; border-color: transparent; border-image: initial;" />
      <button id="button-search"
        style="box-sizing: border-box; position: absolute; height:100%; top: 0px; right: 0px; color: rgb(121, 148, 212); cursor: pointer; -webkit-appearance: none; box-shadow: none; transition: all 100ms ease-out; border: 1px solid transparent; padding: 0px 1rem; background: transparent;">
        <svg fill="none" style="width:3.3em" viewBox="0 0 32 32">
          <title>Rechercher</title>
          <path
            d="M27.319 25.368a.935.935 0 01-1.304 1.341l-6.256-6.012a9.797 9.797 0 01-6.092 2.1C8.327 22.798 4 18.59 4 13.4S8.328 4 13.667 4c5.338 0 9.666 4.208 9.666 9.399 0 2.245-.81 4.307-2.16 5.923l6.146 6.046zm-13.652-4.515c4.234 0 7.666-3.337 7.666-7.454 0-4.117-3.432-7.454-7.666-7.454C9.432 5.945 6 9.282 6 13.399c0 4.117 3.432 7.454 7.667 7.454z"
            fill="currentColor"></path>
        </svg>
      </button>
      <input type="hidden" name="source" value="widget" />
    </div>
  </form>
</div>
`;
  setTimeout(init, 300);
  function init() {
    iframe.contentWindow.document.body.innerHTML = widget;
    const root = iframe.contentWindow.document.querySelector("#root");
    let lastHeight = 0;
    function measureHeight() {
      const height = root.getBoundingClientRect().height;
      if (height != lastHeight) {
        lastHeight = height;
        iframe.height = height;
      }
    }
    setTimeout(measureHeight, 0);
  }
}

window.addEventListener("DOMContentLoaded", addWidget);