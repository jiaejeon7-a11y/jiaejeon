"use client"

import Image from "next/image"
import Link from "next/link"
import { useEffect } from "react"
import { useParams } from "next/navigation"

// Product data with detail images
const productData: Record<number, { detailImages: string[], shopifyComponentId: string, shopifyProductId: string, description?: string, extraImages?: { url: string, name: string, hoverText?: string }[], redTintImage?: string }> = {
  1: {
    detailImages: [
      "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/%E1%84%8C%E1%85%A6%E1%84%91%E1%85%AE%E1%86%B71-JJaow7rRQzwOJKssFJeubpXW0V5fQP.jpg",
      "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/%E1%84%8C%E1%85%A6%E1%84%91%E1%85%AE%E1%86%B71-2-SBuPl2w3d0kibtOODGGgR6UgGTKxha.jpg",
      "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/%E1%84%8C%E1%85%A6%E1%84%91%E1%85%AE%E1%86%B71-3-j4PJeMv5hCkeZlO1XYXwr4K1QgmPnv.jpg",
    ],
    shopifyComponentId: "product-component-1773416155265",
    shopifyProductId: "15724459589713",
    description: "148*118, 56p, 2025\n\nA tale tracing the past of my beloved parrot, Malkovich. Who was she before she came into my life?",
  },
  2: {
    detailImages: [
      "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/%E1%84%8C%E1%85%A6%E1%84%91%E1%85%AE%E1%86%B72-2LiuBizTPvyHnkZJlPPWNaeTBB0qHM.jpg",
      "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/%E1%84%8C%E1%85%A6%E1%84%91%E1%85%AE%E1%86%B72-1-draJkO2W5jM75MGyuckmXb5Zv8CYDM.jpg",
    ],
    shopifyComponentId: "product-component-1773416307275",
    shopifyProductId: "15724469518417",
    description: "128*182, 74p, 2024\n\nIn a small room, I imagine Antarctica. At the end of an imagination filled with excitement, things begin to reveal themselves when the sun rises.",
  },
  3: {
    detailImages: [
      "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/%E1%84%8C%E1%85%A6%E1%84%91%E1%85%AE%E1%86%B73-DhxuGLrnyth8jqURExK7fwCujewz8U.jpg",
      "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/%E1%84%8C%E1%85%A6%E1%84%91%E1%85%AE%E1%86%B73-1-ggJwmt82cAhtdWEmG11KYBXXaubP9V.jpg",
      "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/%E1%84%8C%E1%85%A6%E1%84%91%E1%85%AE%E1%86%B73-2-871Erv7EGsF7tekyuupMhluyPr7wvW.jpg",
    ],
    shopifyComponentId: "product-component-1773416458389",
    shopifyProductId: "15724470337617",
    description: "A story of an ant searching for the Great Candy. A room filled with various clues-but something feels slightly off!\n\nCandy Code: Cube Edition is an object collection that includes still cuts from the video Candy Code and vintage objects discovered in the streets of Seoul. Each cube contains a private photograph and a piece of text from Jiae, presented on the back of the cards.",
    extraImages: [
      { url: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/candycode1-gGGOMh89fEeeTe5DyBh3Nux0Nqglva.png", name: "candycode1", hoverText: "앵무새와 누드\n\nwork () play (). 그리고 ()하지 마라.\n문득 내 주변의 () 사람들은 모두 얼굴이 ()하고, ()의 흔적이 그들의 ()과 ()를 그윽하게 만들고 있다는 사실을 깨달았다. 나는 아직 ()하지 않고 () 지낸 흔적이 얼굴에 고스란히 묻혀있었다. ()은 터질듯이 쪗고. ()은 거의 없고 점점 오라가 줄어들었을까. 물론 ()다. 몸무게와 상관없다. 그저 얼굴과 눈빛에 고스란히 ()이 묻어있는 것이다." },
      { url: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/candycode2-SuIAfovPgzR9yacXJL9R8TUqsGtMKj.png", name: "candycode2", hoverText: "아빠가 티비를 닦다\n\n그렇지만 ()는\n내가 전시에 쓸 ()의 먼지를 닦으며..\n영상 ()이 다 그렇지 뭐..\n라고 ()하셨다.\n마치 나는 지금 ()로 떠밀려 가고있는데 아빠는 그저 ()에서 손흔들며 잘가라 인사하는 아 ()…\n()을 이해하지 못해도...그래도 다른 사람들에게 멀끔한 ()로 보이길 바라시것지..." },
      { url: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/candycode3-jd7sNWEywoyuIFb2f6BFtXWDHQuJRo.png", name: "candycode3", hoverText: "신비로운 아이들\n\n()살 아이가 정해진 물건을 안 그리고 내 ()에 있는 ()를 그리고 있어서 깜짝 놀랐다. 뱃지의 ()보다 () 그려놔서 ()서 보고 놀랐다. 그래서 내 ()를 서둘러 보았는데 뱃지가 (), ()중에 나도 () ()에서 빠진 ()를 주워서 () 심장이 ()리고 너무 ()" },
      { url: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/candycode4-iBcLUowp7A7Zl5z7aLm6LBJcuou38v.png", name: "candycode4", hoverText: "크래프트의 힘\n\n()로 불러오는 것은 많이 ()하고 설레는 과정이다.\n나는 주로 () 속에 읶다.\n너무 () 탓에 나에게는 Craft의 ()이 ()는데 오랜만에 ()를 하려니 ().\n()와 ()을 갖고 () 맘에 드는 ()가 ()까지...\nCraft의 미학은 () 인듯하다 그 ()들은 ()이고..()의 ()과 ()을 움직여 느껴진 ()들은 정말이지 ()하는 기분이다.\n() 밖에서 직접 ()으로 ()의 ()을 만들어보니 꽤나 많은 ()이 들어간다. 그리고 () 계속해서\n\n() 친구들(패션,조소과)에게 너무 ()하게 된다. ()() ()로 ()할 ()을 ()." },
      { url: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/candycode5-hwlMcZ2YwhBS4H4i9sSKPpzGLfUnDx.png", name: "candycode5", hoverText: "닌교초 행아웃\n\n도쿄여행 중 나는 ()나 () 같은 곳 말고 () 동네를 가고 싶었다. 난 닌교초의 어느 작은 ()에 들어갔다.\n사장님은 갑자기 ()의 ()을 ()에게 알려주기 시작했다. () boy! no im a () boy.\n()쨩은 ()고, ()이다.\n()상은 () 대표다.\n사장님은 맛있는 ()을 주셨다.\n우리는 2차로 ()에 갔다." },
      { url: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/candycode6-bVDGz2Rtg3kXGtd1V7II6cxnZN6gek.png", name: "candycode6", hoverText: "도파민 슬로우와 디저트\n\n()에 너무 많은 ()으로 나는 ()가 다 ()서 모든 것에 ()해졌다. 그래서 ()를 했다. ()를 한동안 끊었다. ()이 되자 ()이 일어난다. ()의 ()이 ()으로 ()는 걸 느낀다..\n이젠 ()만 굴러가도 ()고, ()은 ()으로 가득차있었다. 그런 () 속 ()는 엄청난 ()을 가져다 준다. 오후 ()시. ()는 ()을 들고 있었고, ()이 만들어준 ()의 ()를 보니 ()가 바로 () 그 자체임을 꺠달았다. ()는 ()을 녹이는 ()이 아닌 ()을 먹는 ()이다." },
      { url: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/candycode7-PB1ebo390W1utRuGL4GFgoMMyh99oc.png", name: "candycode7", hoverText: "안테나\n\n()고 () 법에 대하여.\n()가 무서워 하는 것은 () 것이다.\n()진 저것은 절대 ()는데\n게속 ()을 하고 ()를 ()로 보내다니\n()의 안테나. ()이 () 엄청난 ()이 되다." },
      { url: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/candycode8-LXsH7Mb8BbiQUMmzvveepixqGmuc9S.png", name: "candycode8", hoverText: "f()와의 대화\n\n나는 F()에게 나의 ()을 이야기 했다.\n그것은 내가 () 대신 ()로 사람들이랑 () ()에 대한 거였다.\n\nF()는 () 이야기를 꺼냈다.\n\n나는 ()이 되기 위한 ().\n나는 ()이라 답했고()\n그사람은 () 이랬는데.\n\n사실 우린 계속 ()에 대해 이야기 하고 있던 것이었다. 하지만 우린 서로의 정확한 입장을 약 ()% 정도만 파악했을 것이다." },
      { url: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/candycode9-6b8qXyDtNPhMucfx9nOIIvyhHBYou0.png", name: "candycode9", hoverText: "시간을 내 ()으로 () 법.\n\n()들과 하루를 보내면 ()이 정말 () 간다.\n시간이 ()을 느끼고 ()면 정말 ()해진다.\nact like you got time and ().\neverything is (), but everything (). 시간을 내 ()으로 ()법. 늘 ()개월 정도 () 가라.\n투홀리스 ()을 () 즐겨듣고 찬양하라.\n세상과 ()를 만들면 넌 언제나 () 또는 ()" },
      { url: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/candycode10-QYSrnekVQiF6MaykK7VuSRanhnBkLs.png", name: "candycode10", hoverText: "벽간소음 트라우마.\n\n1년 넘게 옆집 ()소리에 나는 이제 () 반응까지 증세가 굳어져버렸다. 나는 이 ()에 대한 ()를 어떻게 부탁해야할지 1년 넘게 고민했다. 결국 참다가 ()를 귀울여 ()가 되었다. 나의 분노는 이제 ()��� () ����으로 ()이 불가능해져서 ()도 못하게 생겼다.\n()는 ()할 수 없다.\n()할수록 () ()해도 ()한다.\n()을 ()하는 것이 결국 각자에게 가장 작은 ()일테니.\n난 이제 그냥 ()를 크게 틀어둔다." },
    ],
  },
  4: {
    detailImages: [
      "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/%E1%84%8C%E1%85%A6%E1%84%91%E1%85%AE%E1%86%B74-1-FRvxk5L428JG7NrnOdIyPYBDptPfX6.jpg",
    ],
    shopifyComponentId: "product-component-1773407359730",
    shopifyProductId: "15724472827985",
    description: "Transfer sticker on frame, 21 x 16 cm, 2026",
  },
  5: {
    detailImages: [
      "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/%E1%84%8C%E1%85%A6%E1%84%91%E1%85%AE%E1%86%B75-1-QQ9LI0n276BRZQhJKKGW0bARkhSqo8.jpg",
      "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/%E1%84%8C%E1%85%A6%E1%84%91%E1%85%AE%E1%86%B75-2-G5tNzYh1eau4NxL09gb5bfMlcDuk3x.jpg",
    ],
    shopifyComponentId: "product-component-1773406910076",
    shopifyProductId: "15724471091281",
    description: "Due to the nature of the red-dyed sleeves, significant color bleeding and transfer may occur during washing. Hand wash cold separately only. Please note that returns or exchanges due to color bleeding are not accepted.",
    redTintImage: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/%E1%84%8C%E1%85%A6%E1%84%91%E1%85%AE%E1%86%B75-3-mvxNtdSoKYKwwkdOTjghHRvss69gmY.png",
  },
  6: {
    detailImages: [],
    shopifyComponentId: "product-component-1773408048376",
    shopifyProductId: "15724473614417",
    description: "Digital print on transparent substrate 120 x 30 cm, 2026",
  },
}

// Shopify button styles for each product
const shopifyStyles: Record<number, object> = {
  1: {
    "product": {
      "styles": {
        "product": {
          "font-family": "Cormorant Garamond, Georgia, serif"
        },
        "title": {
          "font-family": "Cormorant Garamond, Georgia, serif",
          "font-weight": "400",
          "font-size": "14px"
        },
        "price": {
          "font-family": "Cormorant Garamond, Georgia, serif",
          "font-size": "14px"
        },
        "button": {
          "font-family": "Cormorant Garamond, Georgia, serif",
          "font-size": "14px",
          "padding-top": "15px",
          "padding-bottom": "15px",
          "color": "#b4aa8f",
          ":hover": { "color": "#b4aa8f", "background-color": "#090909" },
          "background-color": "#050505",
          ":focus": { "background-color": "#090909" },
          "padding-left": "19px",
          "padding-right": "19px"
        },
        "img": {
          "display": "none"
        },
        "imgWrapper": {
          "display": "none"
        }
      },
      "contents": {
        "img": false,
        "imgWithCarousel": false
      },
      "text": { "button": "Add to cart" }
    },
    "cart": {
      "styles": {
        "button": {
          "font-family": "Big Caslon, serif",
          "background-color": "#050505",
          "color": "#b4aa8f"
        }
      }
    },
    "toggle": {
      "styles": {
        "toggle": { "background-color": "#050505" },
        "count": { "color": "#b4aa8f" },
        "iconPath": { "fill": "#b4aa8f" }
      }
    }
  },
  2: {
    "product": {
      "styles": {
        "product": {
          "font-family": "Cormorant Garamond, Georgia, serif"
        },
        "title": {
          "font-family": "Cormorant Garamond, Georgia, serif",
          "font-weight": "400",
          "font-size": "14px"
        },
        "price": {
          "font-family": "Cormorant Garamond, Georgia, serif",
          "font-size": "14px"
        },
        "button": {
          "font-family": "Cormorant Garamond, Georgia, serif",
          "font-size": "14px",
          "padding-top": "15px",
          "padding-bottom": "15px",
          ":hover": { "background-color": "#2e333a" },
          "background-color": "#333940",
          ":focus": { "background-color": "#2e333a" },
          "padding-left": "19px",
          "padding-right": "19px"
        },
        "img": {
          "display": "none"
        },
        "imgWrapper": {
          "display": "none"
        }
      },
      "contents": {
        "img": false,
        "imgWithCarousel": false
      },
      "text": { "button": "Add to cart" }
    },
    "cart": {
      "styles": {
        "button": {
          "font-family": "Big Caslon, serif",
          "background-color": "#333940"
        }
      }
    },
    "toggle": {
      "styles": {
        "toggle": { "background-color": "#333940" }
      }
    }
  },
  3: {
    "product": {
      "styles": {
        "product": {
          "font-family": "Cormorant Garamond, Georgia, serif"
        },
        "title": {
          "font-family": "Cormorant Garamond, Georgia, serif",
          "font-weight": "400",
          "font-size": "14px"
        },
        "price": {
          "font-family": "Cormorant Garamond, Georgia, serif",
          "font-size": "14px"
        },
        "button": {
          "font-family": "Cormorant Garamond, Georgia, serif",
          "font-size": "14px",
          "padding-top": "15px",
          "padding-bottom": "15px",
          ":hover": { "background-color": "#2e333a" },
          "background-color": "#333940",
          ":focus": { "background-color": "#2e333a" },
          "padding-left": "19px",
          "padding-right": "19px"
        },
        "img": {
          "display": "none"
        },
        "imgWrapper": {
          "display": "none"
        }
      },
      "contents": {
        "img": false,
        "imgWithCarousel": false
      },
      "text": { "button": "Add to cart" }
    },
    "cart": {
      "styles": {
        "button": {
          "font-family": "Big Caslon, serif",
          "background-color": "#333940"
        }
      }
    },
    "toggle": {
      "styles": {
        "toggle": { "background-color": "#333940" }
      }
    }
  },
  4: {
    "product": {
      "styles": {
        "product": {
          "font-family": "Cormorant Garamond, Georgia, serif"
        },
        "title": {
          "font-family": "Cormorant Garamond, Georgia, serif",
          "font-weight": "400",
          "font-size": "14px"
        },
        "price": {
          "font-family": "Cormorant Garamond, Georgia, serif",
          "font-size": "14px"
        },
        "button": {
          "font-family": "Cormorant Garamond, Georgia, serif",
          "font-size": "14px",
          "padding-top": "15px",
          "padding-bottom": "15px",
          "color": "#b4aa8f",
          ":hover": { "color": "#b4aa8f", "background-color": "#090909" },
          "background-color": "#050505",
          ":focus": { "background-color": "#090909" },
          "padding-left": "19px",
          "padding-right": "19px"
        },
        "img": {
          "display": "none"
        },
        "imgWrapper": {
          "display": "none"
        }
      },
      "contents": {
        "img": false,
        "imgWithCarousel": false
      },
      "text": { "button": "Add to cart" }
    },
    "cart": {
      "styles": {
        "button": {
          "font-family": "Big Caslon, serif",
          "background-color": "#050505",
          "color": "#b4aa8f"
        }
      }
    },
    "toggle": {
      "styles": {
        "toggle": { "background-color": "#050505" },
        "count": { "color": "#b4aa8f" },
        "iconPath": { "fill": "#b4aa8f" }
      }
    }
  },
  5: {
    "product": {
      "styles": {
        "product": {
          "font-family": "Cormorant Garamond, Georgia, serif"
        },
        "title": {
          "font-family": "Cormorant Garamond, Georgia, serif",
          "font-weight": "400",
          "font-size": "14px"
        },
        "price": {
          "font-family": "Cormorant Garamond, Georgia, serif",
          "font-size": "14px"
        },
        "button": {
          "font-family": "Cormorant Garamond, Georgia, serif",
          "font-size": "14px",
          "padding-top": "15px",
          "padding-bottom": "15px",
          "color": "#43453b",
          ":hover": { "color": "#43453b", "background-color": "#e69f9f" },
          "background-color": "#ffb1b1",
          ":focus": { "background-color": "#e69f9f" },
          "padding-left": "19px",
          "padding-right": "19px"
        }
      },
      "text": { "button": "Add to cart" }
    },
    "cart": {
      "styles": {
        "button": {
          "font-family": "Big Caslon, serif",
          "background-color": "#ffb1b1",
          "color": "#43453b"
        }
      }
    },
    "toggle": {
      "styles": {
        "toggle": { "background-color": "#ffb1b1" },
        "count": { "color": "#43453b" },
        "iconPath": { "fill": "#43453b" }
      }
    }
  },
  6: {
    "product": {
      "styles": {
        "product": {
          "font-family": "Cormorant Garamond, Georgia, serif"
        },
        "title": {
          "font-family": "Cormorant Garamond, Georgia, serif",
          "font-weight": "400",
          "font-size": "14px"
        },
        "price": {
          "font-family": "Cormorant Garamond, Georgia, serif",
          "font-size": "14px"
        },
        "button": {
          "font-family": "Cormorant Garamond, Georgia, serif",
          "font-size": "14px",
          "padding-top": "15px",
          "padding-bottom": "15px",
          "color": "#b4aa8f",
          ":hover": { "color": "#b4aa8f", "background-color": "#090909" },
          "background-color": "#050505",
          ":focus": { "background-color": "#090909" },
          "padding-left": "19px",
          "padding-right": "19px"
        }
      },
      "text": { "button": "Add to cart" }
    },
    "cart": {
      "styles": {
        "button": {
          "font-family": "Big Caslon, serif",
          "background-color": "#050505",
          "color": "#b4aa8f"
        }
      }
    },
    "toggle": {
      "styles": {
        "toggle": { "background-color": "#050505" },
        "count": { "color": "#b4aa8f" },
        "iconPath": { "fill": "#b4aa8f" }
      }
    }
  }
}

declare global {
  interface Window {
    ShopifyBuy: {
      buildClient: (config: { domain: string; storefrontAccessToken: string }) => unknown;
      UI: {
        onReady: (client: unknown) => Promise<{
          createComponent: (type: string, config: unknown) => void;
        }>;
      };
    };
  }
}

export default function ProductDetailPage() {
  const params = useParams()
  const productId = Number(params.id)
  const product = productData[productId]

  useEffect(() => {
    if (!product) return

    const componentId = product.shopifyComponentId
    const containerNode = document.getElementById(componentId)
    
    // Clear any existing content to prevent duplicates
    if (containerNode) {
      containerNode.innerHTML = ''
    }

    const scriptURL = 'https://sdks.shopifycdn.com/buy-button/latest/buy-button-storefront.min.js'

    function ShopifyBuyInit() {
      const client = window.ShopifyBuy.buildClient({
        domain: 'xhw6su-ew.myshopify.com',
        storefrontAccessToken: '3dd525f55ea56527ded86f6c04ba4378',
      })
      
      window.ShopifyBuy.UI.onReady(client).then(function (ui) {
        const node = document.getElementById(componentId)
        if (node && node.children.length === 0) {
          ui.createComponent('product', {
            id: product.shopifyProductId,
            node: node,
            moneyFormat: '%24%7B%7Bamount%7D%7D',
            options: shopifyStyles[productId] || shopifyStyles[1],
          })
        }
      })
    }

    function loadScript() {
      const existingScript = document.querySelector(`script[src="${scriptURL}"]`)
      if (existingScript) {
        // Script exists, wait for ShopifyBuy to be available
        const checkShopify = setInterval(() => {
          if (window.ShopifyBuy && window.ShopifyBuy.UI) {
            clearInterval(checkShopify)
            ShopifyBuyInit()
          }
        }, 100)
        return
      }
      
      const script = document.createElement('script')
      script.async = true
      script.src = scriptURL
      document.head.appendChild(script)
      script.onload = () => {
        // Wait for ShopifyBuy.UI to be ready
        const checkUI = setInterval(() => {
          if (window.ShopifyBuy && window.ShopifyBuy.UI) {
            clearInterval(checkUI)
            ShopifyBuyInit()
          }
        }, 100)
      }
    }

    if (window.ShopifyBuy && window.ShopifyBuy.UI) {
      ShopifyBuyInit()
    } else {
      loadScript()
    }

    // Cleanup function
    return () => {
      const node = document.getElementById(componentId)
      if (node) {
        node.innerHTML = ''
      }
    }
  }, [product, productId])

  if (!product) {
    return (
      <div className="min-h-screen flex items-center justify-center stripe-bg font-serif">
        <p className="text-gray-600">Product not found</p>
      </div>
    )
  }

  return (
    <div className="min-h-screen stripe-bg overflow-x-hidden font-serif">
      {/* Back Button */}
      <Link 
        href="/shop" 
        className="fixed top-6 left-6 z-50 text-sm text-gray-600 hover:text-gray-900 transition-colors"
      >
        Back
      </Link>

      {/* Content */}
      <main className="flex flex-col items-center py-20 px-4">
        {/* Detail Images - Vertical Stack with No Gap */}
        <div className="flex flex-col w-full max-w-2xl">
          {product.detailImages.map((image, index) => (
            <Image
              key={index}
              src={image}
              alt={`Product ${productId} detail ${index + 1}`}
              width={800}
              height={800}
              className="w-full h-auto"
            />
          ))}
        </div>

        {/* Shopify Buy Button */}
        <div className="mt-12 flex justify-center">
          <div id={product.shopifyComponentId}></div>
        </div>

        {/* Product Description */}
        {product.description && (
          <div className="mt-16 mb-12 text-center max-w-2xl px-4">
            <p className="text-gray-700 text-sm leading-relaxed whitespace-pre-line">
              {product.description}
            </p>
          </div>
        )}

        {/* Red Tint Image for Product 5 */}
        {product.redTintImage && (
          <div className="w-full max-w-2xl mt-8">
            <div className="relative w-full group cursor-pointer">
              <Image
                src={product.redTintImage}
                alt="Product image with red tint effect"
                width={800}
                height={1000}
                className="w-full h-auto transition-all duration-1000 ease-in-out group-hover:sepia group-hover:saturate-200 group-hover:hue-rotate-[-50deg]"
                style={{
                  filter: 'saturate(1)',
                }}
              />
              <div className="absolute inset-0 bg-red-600/0 group-hover:bg-red-600/40 transition-all duration-1000 ease-in-out pointer-events-none" />
            </div>
          </div>
        )}

        {/* Extra Images with Names and Hover Text */}
        {product.extraImages && product.extraImages.length > 0 && (
          <div className="flex flex-col w-full max-w-2xl mt-8">
            {product.extraImages.map((img, index) => (
              <div key={index} className="flex flex-col items-center">
                <div className="relative w-full group cursor-pointer">
                  <Image
                    src={img.url}
                    alt={img.name}
                    width={800}
                    height={800}
                    className="w-full h-auto"
                  />
                  {img.hoverText && (
                    <div className="absolute inset-0 bg-white/90 flex items-center justify-center p-4 md:p-8 opacity-0 group-hover:opacity-100 transition-opacity duration-700 ease-in-out overflow-hidden">
                      <p className="text-gray-700 text-[10px] md:text-sm leading-relaxed whitespace-pre-line text-center select-none overflow-y-auto max-h-full">
                        {img.hoverText}
                      </p>
                    </div>
                  )}
                </div>
                <p className="text-gray-700 text-sm mt-4 mb-8">{img.name}</p>
              </div>
            ))}
          </div>
        )}

        {/* Footer */}
        <footer className="mt-16 mb-8 text-center">
          <p className="text-gray-700 text-sm">
            shopping260314, jiaejeon7@gmail.com
          </p>
          <p className="text-gray-700 text-sm mt-2">
            © 2026 Jiae Jeon. All rights reserved.
          </p>
        </footer>
      </main>
    </div>
  )
}
