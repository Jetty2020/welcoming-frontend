import Link from 'next/link';

export const Navigation = () => {
  return (
    <>
      <header>
        <h1 className="sr-only">어서와 우리집</h1>
        <Link href="/" passHref>
          <a>
            <img src="/logo/logo_txt.png" alt="어서와 우리집 로고" />
          </a>
        </Link>
        <ul>
          <li>
            <Link href="/" passHref>
              <a>
                <span className="sr-only">위시리스트</span>
              </a>
            </Link>
          </li>
          <li>
            <Link href="/" passHref>
              <a>
                <span className="sr-only">장바구니</span>
              </a>
            </Link>
          </li>
        </ul>
        <nav>
          <ul>
            <li>
              <Link href="/" passHref>
                <a>스토어홈</a>
              </Link>
            </li>
            <li>
              <Link href="/" passHref>
                <a>카테고리</a>
              </Link>
            </li>
            <li>
              <Link href="/" passHref>
                <a>베스트</a>
              </Link>
            </li>
            <li>
              <Link href="/" passHref>
                <a>스타일링팁</a>
              </Link>
            </li>
            <li>
              <Link href="/" passHref>
                <a>실속인테리어</a>
              </Link>
            </li>
            <li>
              <Link href="/" passHref>
                <a>오늘의딜</a>
              </Link>
            </li>
            <li>
              <Link href="/" passHref>
                <a>기획전</a>
              </Link>
            </li>
          </ul>
        </nav>
      </header>
      <nav>
        <ul>
          <li>
            <Link href="/" passHref>
              <a>홈</a>
            </Link>
          </li>
          <li>
            <Link href="/" passHref>
              <a>카테고리</a>
            </Link>
          </li>
          <li>
            <Link href="/" passHref>
              <a>검색</a>
            </Link>
          </li>
          <li>
            <Link href="/" passHref>
              <a>마이페이지</a>
            </Link>
          </li>
        </ul>
      </nav>
    </>
  );
};
