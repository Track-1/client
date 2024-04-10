import AlbumCard from '../../Common/UI/AlbumCard';
import { useGetRecentTracks } from 'track-1-shared/src/index';

export default function MainPageContainer() {
  const audioSrc1 = 'https://media.w3.org/2010/07/bunny/04-Death_Becomes_Fur.mp4';
  const audioSrc2 =
    'https://d19ot9c0ybvi5o.cloudfront.net/audio/1707228411968-2a4537e1-f050-47da-89a7-0aba5abd7af5.blob?Expires=1712811289&Key-Pair-Id=KHRWYD6UA5KH7&Signature=B9DiYtyCxl3RYRHsHNpiL82zHFD2bZdPo8buq8B29mPjaUTBgc3VnJyLB8S~oDTJ3Qo7RUkNUoC~nJCRyWYAayuAu77xNW5uLjwQ9PL8Pn3oT07P8kaA38f33KnOLmXcs0lOZEZ~f7eEV2-aqaa2SGLQxLAJY7V2U~-OOvHq6eEsYAb44ZaxdlCX-z8u8ojQKtcBB8GA5R6h7ysZ8HKA7qQacgHkrevxkuo-iDu7iQ4ueATusgOFOD9sMQb6CYR2p874TYmzpYGF~S-Q5BUdYidDcnttOLL1FQVIlY-1ClMKIEJVpSNTigHqEGi2rqS0KQGeaXH7FG5799lDwAE49g__';

  const {} = useGetRecentTracks();

  return (
    <>
      <AlbumCard
        imageSrc="https://github.com/Track-1/client/assets/70846061/e70cd250-cd2a-435d-a77b-f7afb257cea7"
        imageAlt=""
        coverSize="md"
        coverShape="circle"
        audioSrc={audioSrc1}
        audioTitle="테스트1"
        userName="홍명헌"
        iconPosition="center"
      />
      <AlbumCard
        imageSrc="https://github.com/Track-1/client/assets/70846061/7bccfb02-056e-4cb2-86a0-7b6934e2392a"
        imageAlt=""
        coverSize="md"
        coverShape="circle"
        audioSrc={audioSrc2}
        audioTitle="테스트2"
        userName="애플워치"
        iconPosition="center"
      />
    </>
  );
}
