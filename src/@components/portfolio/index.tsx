import ProducerBigPortfolio from "./producerBigPortfolio";
import ProducerSmallPortfolio from "./producerSmallPortfolio";
import VocalBigPortfolio from "./vocalBigPortfolio";
import VocalSmallPortfolio from "./vocalSmallPortfolio";

export default function Portfolio() {
  const data = [
    {
      portfolioId: 12,
      portfolioImageFile:
        "https://d39q64jkjik0b.cloudfront.net/audio/1691769280212-a8cc4add-ab0d-4612-b9cb-1763a912359f.mp3?Expires=1691855681&Key-Pair-Id=K1Q4IA68MZB7BO&Signature=u7zQy7pm5~XR8fhQXFWs8xjqPsCRcDw5m1hb9L35j0hDLrr8BB5o-KTeNzdhrVxYKNytxLF1T~PxAP~~ZdHxNK4dI9J4orKr8xAnY-rMwKULtq8e6-WGNLFCGAumwQlSGI~G3vhdHHAxLoWD2AoUKmwSGEOGL1AaPoIbavfHsisOlt7kxWH1NG~t511t82rJ8NtyyEa0~VkTHsVCeG1MJlG1qi8vWVgnHuCU332dAFv0bUeSNODYSiIiEZJ21xhU0~L7MWbVE4GakK5KevNtrn069g1zRGuHTFg3vKlWjHtI5PWTt6ubf6zy80bPhKRylAyGfVQ9cfKwzpQxoEuL6Q__",
      portfolioAudioFile:
        "https://d39q64jkjik0b.cloudfront.net/image/1691769280271-6990d9e3-5517-4917-8931-4948a55e6837.png?Expires=1691855681&Key-Pair-Id=K1Q4IA68MZB7BO&Signature=Oz9dO7Ay2Qw3yGgW2kZEFbJD1ytr6bVxnJvUf~RmyeodtwgQUSKVm2WW1Tnli6xBhdntg3C7kCDuZvgI5~gTee0~UI2b~C4YcZ8qSyLCCcwtcY-BG7awu7T-v5jSLYKgWfZOk9-VgiS53SAhCSQx4rWSyMJvJXC1U359uKGegVVZRcrsBieo9PnEPPSfcSKNKTFZZu4Nbyprp9Fe5KPcM2DMiIhuUyhquUnh2YKxNj~8pxMavaUvCsFAiitlKY2EDsRsCwOG058jRUNX-Bkw9u8g12Low2f3MVTHl3GZKloqknTwkQc8lVSavWaoNZxk81dUkM8SpwIUfBC5~vgcYA__",
      portfolioAudioFileName: null,
      portfolioTitle: "반전",
      portfolioContent:
        "복선이 저절로 배치되지 않은 채 갑작스러운 반전이 일어나면 반감을 사기 쉽다. 그리고 작품을 부정적으로 평가할 때 개연성이라는 표현을 남용하는 경향이 있기 때문에, 복선 없는 반전을 '개연성이 없다'라고 칭하는 경우가 많다. 그러나 엄밀히 말해서 복선은 존재하는 것이 더 개연성이 없는 것이다. 많은 감상자들이 복선 없는 반전에 어색함이나 반감을 가지는 것은 그것이 개연성이 없어서가 아니라, 인간의 감정적 본성과 장르의 관습 때문일 뿐이다.",
      portfolioKeyword: ["강렬한", "몰아치는", "Hip-hop"],
      portfolioCategory: "Hiphop",
      portfolioAudioFileLength: 224.261224,
    },
    {
      portfolioId: 18,
      portfolioImageFile:
        "https://d39q64jkjik0b.cloudfront.net/image/1694270788893-78e9051f-52bc-4366-9669-3b366027052a.jpeg?Expires=1694357189&Key-Pair-Id=K1Q4IA68MZB7BO&Signature=rIeEztRvZ2m8KgQsX-5bPeCa-ZeaMvffyF6Z3uepMgN6JzFhjp6nCMcQK53zooi-1j4YDGMK9fgxWbW8w2bRLtV2MA29Ra0kNyq2gm5gdaRbAyxO5helRrcyv0WUGJWZBi0siXt2h6vuWDzbYJC-7j-L-w-DTnh~JtkL4o0Fe3ZQfLgP0DlOy9YeyYsw6rcjsLnd1SvTxzENVJeUULtEq6Je3cY-Dua8CjNKer4zD~3pDWDbJqTrEYUzoDvvPkEh78dQ9BjW-vZPt2HZBTjJovddf9j1hh5IflnlEmxj4uE9Hx7tfWFhTTVX~sCXWnjHTI6UxPhzewZxA9hVXCtrQQ__",
      portfolioAudioFile:
        "https://d39q64jkjik0b.cloudfront.net/audio/1694270788817-e2777bd7-287f-4b2b-afed-0bd98ee48c3f.mp3?Expires=1694357189&Key-Pair-Id=K1Q4IA68MZB7BO&Signature=AOjryt4rGJr6D~10iEx~8dNA4vxvjytmEmqlw-BOCN7X2nCbta8iXkLJV07e3dCTgmhNP9pEN0eVZOtGHNPwH-EPJVmpTcjJc6WZmk93~5ABK~1dpGm-yqryMSrRRDWqBARdBfRoNJd7-fBbZSXszBfVF91VHtUKbE7QBvA7eLAGpGUIsl8hLLwMrapTexT68skxjz57xz4KzDfXE9Cnc-WItaQmKEK79Q6hzftNhMTiDqeLLplGcluUk8-bNDA1mtERgkeV9hxvcaB1uuB9vPhbRaSQjtRnvu4efpXPJtKir~yXCBYOQ3Kbq5IVI-3~GeBJ0btwZlDhU6KwZWzcNQ__",
      portfolioAudioFileName: "e2777bd7-287f-4b2b-afed-0bd98ee48c3f",
      portfolioTitle: "반전",
      portfolioContent:
        "복선이 저절로 배치되지 않은 채 갑작스러운 반전이 일어나면 반감을 사기 쉽다. 그리고 작품을 부정적으로 평가할 때 개연성이라는 표현을 남용하는 경향이 있기 때문에, 복선 없는 반전을 '개연성이 없다'라고 칭하는 경우가 많다. 그러나 엄밀히 말해서 복선은 존재하는 것이 더 개연성이 없는 것이다. 많은 감상자들이 복선 없는 반전에 어색함이나 반감을 가지는 것은 그것이 개연성이 없어서가 아니라, 인간의 감정적 본성과 장르의 관습 때문일 뿐이다.",
      portfolioKeyword: ["강렬한", "몰아치는", "Hip-hop"],
      portfolioCategory: "Hiphop",
      portfolioAudioFileLength: 224.261224,
    },
    {
      portfolioId: 17,
      portfolioImageFile:
        "https://d39q64jkjik0b.cloudfront.net/image/1694269932183-0ac0a889-1dae-438c-ab8d-8fb92e349d7c.jpeg?Expires=1694356332&Key-Pair-Id=K1Q4IA68MZB7BO&Signature=dwqjbScVjPuKtOeV-DGpH68BGAgzXPWetdlpnjYDce-j34mzKY76jP0as~X5Q7RjRM9jJnwKErDgPKkSJUuZxST3XouInTFDBxTDf6XCkHuOfI7i6sMjE3KKqrYS3JtjmRWEfTA4dqu1PvLzHt6ztuD3OU6boL~ezSpZhi4UCESLODhQDarWVGolb5YrdzWpYHmrA5qthwZa0Sn-XMSfbS-9BOzojHSy8Md5tw75N4AABV0BazJNUJkOCgFgxSe~NhDC4~LBk3zdRdicA7hgDSMfBSQ0VLIY218ndWNszJu2pHnXHGKSVR4TUCj0lVqoPjNQh63BkM9uXr4ORxat3g__",
      portfolioAudioFile:
        "https://d39q64jkjik0b.cloudfront.net/audio/1694269932138-55289769-7184-45e9-9b87-a582c8b3b2a7.mp3?Expires=1694356332&Key-Pair-Id=K1Q4IA68MZB7BO&Signature=wKaIkRQ8lkwZsQc9re217~PfNPTZbjD520ODzuuVwn2dAi7-WBzn3N8IlCEYRp-zB2Kf6P4wBqtEIC3sLfDMGTIpztn6di9yTMLa6f0065K~XLA4Yizxs~z6QOPA5uMWVG4EYXAB1jfnyM0bYN8DnILURGMd5P47Inv7oMAD75t7E66BXFrFvx~scRnvZZcwjjV04dIjNOWNugboBMqWGJDuBG-xVgTuVw01x9jWBCmwKaC9ce3B8TIjLDM0c9ibwZxd0pvKECGSofAwjwUD3OROU1X9M~-BdJ-t5KAVCUGKzwzQsyumjqFeh0TJX7mIvWyQzB~O~bdyWByIlmJZTw__",
      portfolioAudioFileName: "55289769-7184-45e9-9b87-a582c8b3b2a7",
      portfolioTitle: "반전",
      portfolioContent:
        "복선이 저절로 배치되지 않은 채 갑작스러운 반전이 일어나면 반감을 사기 쉽다. 그리고 작품을 부정적으로 평가할 때 개연성이라는 표현을 남용하는 경향이 있기 때문에, 복선 없는 반전을 '개연성이 없다'라고 칭하는 경우가 많다. 그러나 엄밀히 말해서 복선은 존재하는 것이 더 개연성이 없는 것이다. 많은 감상자들이 복선 없는 반전에 어색함이나 반감을 가지는 것은 그것이 개연성이 없어서가 아니라, 인간의 감정적 본성과 장르의 관습 때문일 뿐이다.",
      portfolioKeyword: ["강렬한", "몰아치는", "Hip-hop"],
      portfolioCategory: "Hiphop",
      portfolioAudioFileLength: 224.261224,
    },
    {
      portfolioId: 16,
      portfolioImageFile:
        "https://d39q64jkjik0b.cloudfront.net/image/1694269906824-de7e72c3-40ee-431e-b8f1-5d043e14da52.png?Expires=1694356307&Key-Pair-Id=K1Q4IA68MZB7BO&Signature=a4xE4a8FVWFUs7RPKCHppdr4Uc~1Zo5NVnakASZnMhYXRXMglKZHosEyqJ14lHdEOKPGgWiW2lrZ~B~E~WXGj6rBTSgz077lGFgE3ofme0F~F-Fp8a3wNo-L1wgEQQn2MJPUACJIqyAFu80bTubtQWP-JKjdL6jGYv0CgtVxqG6pWFkp6r9Xf94oH8auj-ToituaBVfhKdFiHU2-8Z649dO05xMHvbFd1DbrZrBlL~lLz~Ep1mYGVuEscLCIQFgn3CgNovOqCAkCyRsi1SoGvV4NEpBBdgMNzgET8D628-lchbI4nAGEaWLWCo27Ug5uVrWC8juoUdQXP1QdLVp~JA__",
      portfolioAudioFile:
        "https://d39q64jkjik0b.cloudfront.net/audio/1694269906775-5128c698-59e8-4a2e-8981-c5a1b26328a1.mp3?Expires=1694356307&Key-Pair-Id=K1Q4IA68MZB7BO&Signature=G9LjQHkV7BHrK2AdsakOkE2-D1ZKFPqoz1mMV9ZE1S2KWg9XU0zD8G4450YvEkW0ne6kq716bi91DO-~sLn2rcmoPeGde~bb-Ch07xmKaz97A0RXLI3v5S971R-hkjQ74VkICDTmD64ZOz0vN6DXfQqtx8RPyVTFL2otqshjpBuBpAjuscHIbV5cp-~swHu05bX4bXYDkIBAjsrIEVj82So5Lpa7DM70EsbG~Jo6T7~1kL8RDu6iM7ebuD184RjPYyEzkHv0bFA4DoxdzN2SBuplBfF4UEPGmidn2n-r98UZS~DltGV9Weff~zv8wt7qbFds0oVg3tJyV4ptvemQuQ__",
      portfolioAudioFileName: "5128c698-59e8-4a2e-8981-c5a1b26328a1",
      portfolioTitle: "반전",
      portfolioContent:
        "복선이 저절로 배치되지 않은 채 갑작스러운 반전이 일어나면 반감을 사기 쉽다. 그리고 작품을 부정적으로 평가할 때 개연성이라는 표현을 남용하는 경향이 있기 때문에, 복선 없는 반전을 '개연성이 없다'라고 칭하는 경우가 많다. 그러나 엄밀히 말해서 복선은 존재하는 것이 더 개연성이 없는 것이다. 많은 감상자들이 복선 없는 반전에 어색함이나 반감을 가지는 것은 그것이 개연성이 없어서가 아니라, 인간의 감정적 본성과 장르의 관습 때문일 뿐이다.",
      portfolioKeyword: ["강렬한", "몰아치는", "Hip-hop"],
      portfolioCategory: "Hiphop",
      portfolioAudioFileLength: 224.261224,
    },
    {
      portfolioId: 15,
      portfolioImageFile:
        "https://d39q64jkjik0b.cloudfront.net/image/1693411661692-557bb5db-1953-4f97-a707-213a7897e75d.png?Expires=1693498062&Key-Pair-Id=K1Q4IA68MZB7BO&Signature=NIQkRKO-FiD8ChOSdJhxOVGoNJ6bve9iO~oQ98WWeGitTNmrXJ~LCO3Om1jaLPXBP8KWZj7mv~gM816RcDYLPM8zfmlgwfNSpkSRAFMN5tP8GR0YoepgxhC3E1hFdP3ujkqDV4glgROXfPcW-7Gk0kc~gZXkygQdAmjxSCdo2-dsP4gPxx4T5~mIB23kmZsWMdydvD1P~6r731pxW2tiQdB~lC2~T~wrUlitGB3qONTneT1olVsSAa5lgK6j~e2VRjOEwDJCKCUAhsOTWUtHERcJqHJ-1Hx7JHM-8cZBgVzpRcDMMgOuDSw8Ppqi93649ZLwNjaH3LBCYpm2~DMA5w__",
      portfolioAudioFile:
        "https://d39q64jkjik0b.cloudfront.net/audio/1693411661673-4366e346-b17c-4a5d-bc58-072249d63487.mp3?Expires=1693498062&Key-Pair-Id=K1Q4IA68MZB7BO&Signature=plFdFSePHXE8-JAiQ73JQLC82rcVKaQeIPKKRMyHrfcP-691HghohCdj8zVzrWoFiQN46i5qq7KfOtDH9OFSVA4ICne4LbO8K69rzdVnQVHwodxnVu29NTg4Ig~tNanrtOmuSneW65GUgROIYrSxAJTtabXNOWkZdrTWPxfpkSomHj05cnXClTXvhm8U3Yp3yREKMRzorViG6q0ffd4BIgmcw20U4B4Pi2ACVK9SWj3SrlRY4fPHMbhAwSDuja91Hc3Sv~aqJ9pGrESSicAK6kM9YFHLOOM~vagdWoybmdtD8HbnlUvqozeTxSY8DoLyi~Q2JCV4VJ0-hfdnF5ZWFA__",
      portfolioAudioFileName: "4366e346-b17c-4a5d-bc58-072249d63487",
      portfolioTitle: "반전",
      portfolioContent:
        "복선이 저절로 배치되지 않은 채 갑작스러운 반전이 일어나면 반감을 사기 쉽다. 그리고 작품을 부정적으로 평가할 때 개연성이라는 표현을 남용하는 경향이 있기 때문에, 복선 없는 반전을 '개연성이 없다'라고 칭하는 경우가 많다. 그러나 엄밀히 말해서 복선은 존재하는 것이 더 개연성이 없는 것이다. 많은 감상자들이 복선 없는 반전에 어색함이나 반감을 가지는 것은 그것이 개연성이 없어서가 아니라, 인간의 감정적 본성과 장르의 관습 때문일 뿐이다.",
      portfolioKeyword: ["강렬한", "몰아치는", "Hip-hop"],
      portfolioCategory: "Hiphop",
      portfolioAudioFileLength: 224.261224,
    },
    {
      portfolioId: 14,
      portfolioImageFile:
        "https://d39q64jkjik0b.cloudfront.net/image/1692182008069-721e1dd6-bab5-42a4-9a85-ecb5bb5fd447.png?Expires=1693498076&Key-Pair-Id=K1Q4IA68MZB7BO&Signature=Qpfv8na58kJoNk3KBHmg-c8xe3XOOx1YDCaeY7LjCgbmW4pYaH9BOLWBPrh25UUxZqJrX7SzBfDAAf82ASEVe8acJ1ErUNGFvRqOrhSNu2r~NWD7WZjvGUV51fGjFnUP-FSqaC3Ys4s5OZrXql5NnbyT1mF5EdvcJ0YqOH12yeAF6hfPkuXwpFFqtErWi7Mqi5mmJyjKsT3y~ajLnR68NIYKduiim2P3tgj2ViMteYiXEGoxHaNbC4d~MezxrcrmqIzeL9txz5fpL0017kxWYNfKBGWYQaAoTaNw1sWMYTC3p2WePbVl8bPBjUCkrUaIuwiCnr8wheja39qQaD0-4w__",
      portfolioAudioFile:
        "https://d39q64jkjik0b.cloudfront.net/audio/1692182007909-be0b2de1-5b71-4150-8efc-7d91af29ca38.mp3?Expires=1693498076&Key-Pair-Id=K1Q4IA68MZB7BO&Signature=TxlhRunSlK4jfLDL-Wvw~3my413Kx8Bbih3YNnpNrpNgsGI3X-5LTEnIq2iEtBbNXn57U4gY8yhn5GN9N1gyz6B8CfEUokKVrjkxEY44GxCO6nvOHwCskNWZjDe5sW1F56l4UBFZ0WBvXvsL9Ett13sl9KynY2MhhQBWYP0U6req~9TcKHTy5JsOR8fOeKbg1FSgAE~ag7o03u9RVMrR~clMcM3ZI4lfq1uVjiWLKBWc1ePDwEfEPtlmxhBkzS-V5BVqfAjJKDrttW-7prh6Q-bmCiZXYqopOR6uoVl-dmtHQOkYZQSnJzGaUVqg5zc0D9k9gFBkILzH~p56FafQkg__",
      portfolioAudioFileName: "be0b2de1-5b71-4150-8efc-7d91af29ca38",
      portfolioTitle: "반전",
      portfolioContent:
        "복선이 저절로 배치되지 않은 채 갑작스러운 반전이 일어나면 반감을 사기 쉽다. 그리고 작품을 부정적으로 평가할 때 개연성이라는 표현을 남용하는 경향이 있기 때문에, 복선 없는 반전을 '개연성이 없다'라고 칭하는 경우가 많다. 그러나 엄밀히 말해서 복선은 존재하는 것이 더 개연성이 없는 것이다. 많은 감상자들이 복선 없는 반전에 어색함이나 반감을 가지는 것은 그것이 개연성이 없어서가 아니라, 인간의 감정적 본성과 장르의 관습 때문일 뿐이다.",
      portfolioKeyword: ["강렬한", "몰아치는", "Hip-hop"],
      portfolioCategory: "Hiphop",
      portfolioAudioFileLength: 224.261224,
    },
  ];
  const userType = "vocal";

  return (
    <>
      <VocalBigPortfolio
        portfolioId={14}
        portfolioImageFile={
          "https://d2ljd15ob9zy81.cloudfront.net/vocalProfileImage/1693411394697-ea250385-a73e-47a1-9046-4db5ebfb92b1.jpg?Expires=1695451892&Key-Pair-Id=K1Q4IA68MZB7BO&Signature=TYdA~201zjXoefPabPQpCsQjdn4n81nuhqxu3KE4irfOLKEW8mrizAsxn9VY1HksIyCo2RSmOfNRLLmb-phMYY-ZwxjNT0pqaMk9WfOmBsupUN6hKDlJSjtYuHDuy6thurS2fq8eQ1CwzaGYAhyT2k2ErBw4wkt24zTxG8PwCjp6NMk5cBzkaAzzm4oAPO4bOvHOETn0Hkk7xN5GENhW9vS7l6kKISexKRsGBOK6CT5zgR~7ZaMMTAU1y4hWd8lIy3Zb6Y7OQ1C9URDhkNkpcWz7cv2SxezyT-U8zVofAhIKRqjrUew7l34p1GRJWpNOCAImkHycONfRRt5VlzyJNA__"
        }
        portfolioAudioFile={
          "https://d39q64jkjik0b.cloudfront.net/audio/1692182007909-be0b2de1-5b71-4150-8efc-7d91af29ca38.mp3?Expires=1693498076&Key-Pair-Id=K1Q4IA68MZB7BO&Signature=TxlhRunSlK4jfLDL-Wvw~3my413Kx8Bbih3YNnpNrpNgsGI3X-5LTEnIq2iEtBbNXn57U4gY8yhn5GN9N1gyz6B8CfEUokKVrjkxEY44GxCO6nvOHwCskNWZjDe5sW1F56l4UBFZ0WBvXvsL9Ett13sl9KynY2MhhQBWYP0U6req~9TcKHTy5JsOR8fOeKbg1FSgAE~ag7o03u9RVMrR~clMcM3ZI4lfq1uVjiWLKBWc1ePDwEfEPtlmxhBkzS-V5BVqfAjJKDrttW-7prh6Q-bmCiZXYqopOR6uoVl-dmtHQOkYZQSnJzGaUVqg5zc0D9k9gFBkILzH~p56FafQkg__"
        }
      />
      <VocalSmallPortfolio
        portfolioId={14}
        portfolioImageFile={
          "https://d2ljd15ob9zy81.cloudfront.net/vocalProfileImage/1693411394697-ea250385-a73e-47a1-9046-4db5ebfb92b1.jpg?Expires=1695451892&Key-Pair-Id=K1Q4IA68MZB7BO&Signature=TYdA~201zjXoefPabPQpCsQjdn4n81nuhqxu3KE4irfOLKEW8mrizAsxn9VY1HksIyCo2RSmOfNRLLmb-phMYY-ZwxjNT0pqaMk9WfOmBsupUN6hKDlJSjtYuHDuy6thurS2fq8eQ1CwzaGYAhyT2k2ErBw4wkt24zTxG8PwCjp6NMk5cBzkaAzzm4oAPO4bOvHOETn0Hkk7xN5GENhW9vS7l6kKISexKRsGBOK6CT5zgR~7ZaMMTAU1y4hWd8lIy3Zb6Y7OQ1C9URDhkNkpcWz7cv2SxezyT-U8zVofAhIKRqjrUew7l34p1GRJWpNOCAImkHycONfRRt5VlzyJNA__"
        }
        portfolioAudioFile={
          "https://d39q64jkjik0b.cloudfront.net/audio/1692182007909-be0b2de1-5b71-4150-8efc-7d91af29ca38.mp3?Expires=1693498076&Key-Pair-Id=K1Q4IA68MZB7BO&Signature=TxlhRunSlK4jfLDL-Wvw~3my413Kx8Bbih3YNnpNrpNgsGI3X-5LTEnIq2iEtBbNXn57U4gY8yhn5GN9N1gyz6B8CfEUokKVrjkxEY44GxCO6nvOHwCskNWZjDe5sW1F56l4UBFZ0WBvXvsL9Ett13sl9KynY2MhhQBWYP0U6req~9TcKHTy5JsOR8fOeKbg1FSgAE~ag7o03u9RVMrR~clMcM3ZI4lfq1uVjiWLKBWc1ePDwEfEPtlmxhBkzS-V5BVqfAjJKDrttW-7prh6Q-bmCiZXYqopOR6uoVl-dmtHQOkYZQSnJzGaUVqg5zc0D9k9gFBkILzH~p56FafQkg__"
        }
      />
      <ProducerBigPortfolio
        portfolioId={14}
        portfolioImageFile={
          "https://d2ljd15ob9zy81.cloudfront.net/vocalProfileImage/1693411394697-ea250385-a73e-47a1-9046-4db5ebfb92b1.jpg?Expires=1695451892&Key-Pair-Id=K1Q4IA68MZB7BO&Signature=TYdA~201zjXoefPabPQpCsQjdn4n81nuhqxu3KE4irfOLKEW8mrizAsxn9VY1HksIyCo2RSmOfNRLLmb-phMYY-ZwxjNT0pqaMk9WfOmBsupUN6hKDlJSjtYuHDuy6thurS2fq8eQ1CwzaGYAhyT2k2ErBw4wkt24zTxG8PwCjp6NMk5cBzkaAzzm4oAPO4bOvHOETn0Hkk7xN5GENhW9vS7l6kKISexKRsGBOK6CT5zgR~7ZaMMTAU1y4hWd8lIy3Zb6Y7OQ1C9URDhkNkpcWz7cv2SxezyT-U8zVofAhIKRqjrUew7l34p1GRJWpNOCAImkHycONfRRt5VlzyJNA__"
        }
        portfolioAudioFile={
          "https://d39q64jkjik0b.cloudfront.net/audio/1692182007909-be0b2de1-5b71-4150-8efc-7d91af29ca38.mp3?Expires=1693498076&Key-Pair-Id=K1Q4IA68MZB7BO&Signature=TxlhRunSlK4jfLDL-Wvw~3my413Kx8Bbih3YNnpNrpNgsGI3X-5LTEnIq2iEtBbNXn57U4gY8yhn5GN9N1gyz6B8CfEUokKVrjkxEY44GxCO6nvOHwCskNWZjDe5sW1F56l4UBFZ0WBvXvsL9Ett13sl9KynY2MhhQBWYP0U6req~9TcKHTy5JsOR8fOeKbg1FSgAE~ag7o03u9RVMrR~clMcM3ZI4lfq1uVjiWLKBWc1ePDwEfEPtlmxhBkzS-V5BVqfAjJKDrttW-7prh6Q-bmCiZXYqopOR6uoVl-dmtHQOkYZQSnJzGaUVqg5zc0D9k9gFBkILzH~p56FafQkg__"
        }
      />
      <ProducerSmallPortfolio
        portfolioId={14}
        portfolioImageFile={
          "https://d2ljd15ob9zy81.cloudfront.net/vocalProfileImage/1693411394697-ea250385-a73e-47a1-9046-4db5ebfb92b1.jpg?Expires=1695451892&Key-Pair-Id=K1Q4IA68MZB7BO&Signature=TYdA~201zjXoefPabPQpCsQjdn4n81nuhqxu3KE4irfOLKEW8mrizAsxn9VY1HksIyCo2RSmOfNRLLmb-phMYY-ZwxjNT0pqaMk9WfOmBsupUN6hKDlJSjtYuHDuy6thurS2fq8eQ1CwzaGYAhyT2k2ErBw4wkt24zTxG8PwCjp6NMk5cBzkaAzzm4oAPO4bOvHOETn0Hkk7xN5GENhW9vS7l6kKISexKRsGBOK6CT5zgR~7ZaMMTAU1y4hWd8lIy3Zb6Y7OQ1C9URDhkNkpcWz7cv2SxezyT-U8zVofAhIKRqjrUew7l34p1GRJWpNOCAImkHycONfRRt5VlzyJNA__"
        }
        portfolioAudioFile={
          "https://d39q64jkjik0b.cloudfront.net/audio/1692182007909-be0b2de1-5b71-4150-8efc-7d91af29ca38.mp3?Expires=1693498076&Key-Pair-Id=K1Q4IA68MZB7BO&Signature=TxlhRunSlK4jfLDL-Wvw~3my413Kx8Bbih3YNnpNrpNgsGI3X-5LTEnIq2iEtBbNXn57U4gY8yhn5GN9N1gyz6B8CfEUokKVrjkxEY44GxCO6nvOHwCskNWZjDe5sW1F56l4UBFZ0WBvXvsL9Ett13sl9KynY2MhhQBWYP0U6req~9TcKHTy5JsOR8fOeKbg1FSgAE~ag7o03u9RVMrR~clMcM3ZI4lfq1uVjiWLKBWc1ePDwEfEPtlmxhBkzS-V5BVqfAjJKDrttW-7prh6Q-bmCiZXYqopOR6uoVl-dmtHQOkYZQSnJzGaUVqg5zc0D9k9gFBkILzH~p56FafQkg__"
        }
      />
    </>
  );
}
