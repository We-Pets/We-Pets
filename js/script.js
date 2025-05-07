document.addEventListener('DOMContentLoaded', function() {
    const navToggle = document.querySelector('.nav-toggle');
    const navList = document.querySelector('.nav-list');
    const header = document.querySelector('.header'); // 네비게이션 활성화 시 헤더 스타일 변경용

    if (navToggle && navList) {
        navToggle.addEventListener('click', function() {
            navList.classList.toggle('nav-active');
            header.classList.toggle('nav-open'); // 햄버거 아이콘 X자 모양 변경용
        });
    }

    // 네비게이션 링크 클릭 시 메뉴 닫기 (모바일에서)
    const navLinks = document.querySelectorAll('.nav-link');
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            if (window.innerWidth <= 768 && navList.classList.contains('nav-active')) {
                navList.classList.remove('nav-active');
                header.classList.remove('nav-open');
            }
        });
    });

    // (선택) 스크롤 시 현재 섹션에 해당하는 네비게이션 링크 활성화
    const sections = document.querySelectorAll('main section[id]'); // id가 있는 섹션들
    function setActiveLink() {
        let current = '';
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            if (pageYOffset >= sectionTop - (header.offsetHeight + 20)) { // 헤더 높이 + 여백 고려
                current = section.getAttribute('id');
            }
        });

        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === '#' + current) {
                link.classList.add('active');
            }
        });
    }
    window.addEventListener('scroll', setActiveLink);
    setActiveLink(); // 페이지 로드 시 초기 활성화
});