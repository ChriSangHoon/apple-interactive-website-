(() => {
    let yOffset = 0; // window.pageYOffset 대신 쓸 변수
    let prevScrollHeight = 0; //현재 스크롤 위치 yOffset보다 이전에 위치한 스크롤 섹션들의 스크롤 높이값의 합
    let currentScene = 0; // 현재 활성화된 (눈 앞에 보고있는) 스크롤 섹션

    const sceneInfo = [
        // 4개의 객체 만듦. 스크롤 구간이 4개이기 때문
        {
            // 애니메이션 구간을 미리 설정한다. 스크롤 높이를 미리 만들기, 스크롤 하이트에 스크롤의
            //0 스크롤섹션
            type: 'sticky',
            heightNum: 5, // 브라우저 높이의 5배로 스크롤 하이트를 세팅할 것. 브라우저에 따라 다르므로 고정값으로 설정하지 않는다.
            scrollHeight: 0,
            objs: {
                container: document.querySelector('#scroll-section-0')
            }
        },
        {
            //1
            type: 'normal',
            heightNum: 5,
            scrollHeight: 0,
            objs: {
                container: document.querySelector('#scroll-section-1')
            }
        },
        {
            //2
            type: 'sticky',
            heightNum: 5,
            scrollHeight: 0,
            objs: {
                container: document.querySelector('#scroll-section-2')
            }
        },
        {
            //3
            type: 'sticky',
            heightNum: 5,
            scrollHeight: 0,
            objs: {
                container: document.querySelector('#scroll-section-3')
            }
        }
    ];

    function setLayout() {
        //각 스크롤 섹션의 높이 세팅
        for (let i=0; i< sceneInfo.length; i++){
            sceneInfo[i].scrollHeight = sceneInfo[i].heightNum * window.innerHeight; 
            sceneInfo[i].objs.container.style.height = `${sceneInfo[i].scrollHeight}px`;
        }
        console.log(sceneInfo);
    }
    
    
    function scrollLoop () {
        prevScrollHeight = 0;
        for (let i=0; i<currentScene; i++){
            prevScrollHeight +=  sceneInfo[i].scrollHeight;
        }
        if (yOffset > prevScrollHeight+ sceneInfo[currentScene].scrollHeight){
            currentScene++;
        }
        if (yOffset < prevScrollHeight){
            if(currentScene ===0) return //브라우저 바운스 효과로 currentScene이 -가 되는 것을 방지한다.
            currentScene--;
        }

        console.log(currentScene);
    }


    window.addEventListener('resize', setLayout); //창 크기가 바뀌면 setLayout을 다시 실행시켜준다.
    window.addEventListener('scroll', ()=> {
        yOffset = window.pageYOffset;
        
        scrollLoop();
        //
    });

    setLayout();
}) (); 
// 함수 바로 호출. 전역 변수 사용을 피하기 위함.