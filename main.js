(() => {
    let yOffset = 0; // window.pageYOffset 대신 쓸 변수
    let prevScrollHeight = 0; //현재 스크롤 위치 yOffset보다 이전에 위치한 스크롤 섹션들의 스크롤 높이값의 합
    let currentScene = 0; // 현재 활성화된 (눈 앞에 보고있는) 스크롤 섹션
    let enterNewScene = false; //새로운 씬에 시작된 순간을 true로 하기 위한 변수

    const sceneInfo = [
        // 4개의 객체 만듦. 스크롤 구간이 4개이기 때문
        { 
            // 애니메이션 구간을 미리 설정한다. 스크롤 높이를 미리 만들기, 스크롤 하이트에 스크롤의
            //0 스크롤섹션
            type: 'sticky',
            heightNum: 5, // 브라우저 높이의 5배로 스크롤 하이트를 세팅할 것. 브라우저에 따라 다르므로 고정값으로 설정하지 않는다.
            scrollHeight: 0,
            objs: {
                container: document.querySelector('#scroll-section-0'),
                messageA: document.querySelector('#scroll-section-0 .main-message.a'),
                messageB: document.querySelector('#scroll-section-0 .main-message.b'),
                messageC: document.querySelector('#scroll-section-0 .main-message.c'),
                messageD: document.querySelector('#scroll-section-0 .main-message.d'),              
            }, 
            values: {
                messageA_opacity : [0,1] //투명도가 0에서 1까지. 글자의 
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
        
        yOffset = window.pageYOffset;
        let totalScrollHeight = 0;
        for (let i=0; i< sceneInfo.length; i++){
            totalScrollHeight += sceneInfo[i].scrollHeight;
            if (totalScrollHeight >= yOffset) {
                currentScene = i;
                break; //새로고침해도 body에 id가 잘 부여되게끔 설정해준것.
            }
        }
        document.body.setAttribute('id', `show-scene-${currentScene}`); //스크롤하며 body에 해당 show scene id 부여
    }
    
    function calcValues(values, currentYOffset){
        //values가 opacity
        let rv;
        // 현재 씬에서 스크롤된 범위를 비율로 구하기. 현재 스크롤 / 현재 씬의 전체 스크롤
        let scrollRatio = currentYOffset / sceneInfo[currentScene].scrollHeight;
        rv = scrollRatio * (values[1] - values[0]) + values[0] ;
        
        return rv;
    }
    
    function playAnimation() {
        const objs = sceneInfo[currentScene].objs;
        const values = sceneInfo[currentScene].values;
        const currentYOffset = yOffset - prevScrollHeight;

        switch (currentScene) {
            case 0:
                let messageA_opacity_in = calcValues(values.messageA_opacity, currentYOffset);
                objs.messageA.style.opacity = messageA_opacity_in;
                break;
            case 1:
                break;
            case 2:
                break;
            case 3:
                break;
        }
    }
    function scrollLoop () {
        enterNewScene = false;
        prevScrollHeight = 0;
        for (let i=0; i<currentScene; i++){
            prevScrollHeight +=  sceneInfo[i].scrollHeight;
        }
        if (yOffset > prevScrollHeight+ sceneInfo[currentScene].scrollHeight){
            enterNewScene = true;
            currentScene++;
            document.body.setAttribute('id', `show-scene-${currentScene}`); //스크롤하며 body에 해당 show scene id 부여
        }
        if (yOffset < prevScrollHeight){
            if(currentScene ===0) return //브라우저 바운스 효과로 currentScene이 -가 되는 것을 방지한다.
            enterNewScene = true;
            currentScene--;
            document.body.setAttribute('id', `show-scene-${currentScene}`); //스크롤하며 body에 해당 show scene id 부여
        }
        if (enterNewScene) return;
        playAnimation();
    }



    window.addEventListener('scroll', ()=> {
        yOffset = window.pageYOffset;
        
        scrollLoop();
        //
    });
    // window.addEventListener('DOMContentLoaded', setLayout);
    // DOMContentLoaded는 객체만 실행되면 실행, 더 빠르다.
    window.addEventListener('load', setLayout);
    window.addEventListener('resize', setLayout);
    
    
}) (); 
// 함수 바로 호출. 전역 변수 사용을 피하기 위함.