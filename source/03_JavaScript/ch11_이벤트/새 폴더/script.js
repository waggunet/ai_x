document.addEventListener('DOMContentLoaded', loadData);

async function loadData() {
    try {
        const response = await fetch('data.json');
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();

        // 공통 헤더 로드 (모든 페이지에 적용될 수 있도록 id 확인)
        loadCommonHeader(data.common);

        // 현재 페이지 ID에 따라 해당 페이지 데이터 로드
        const bodyId = document.body.id;
        if (bodyId === 'index-page-body' && data.indexPage) {
            loadIndexPage(data.indexPage, data.common);
        } else if (bodyId === 'project-page-body' && data.projectPage) {
            loadProjectPage(data.projectPage);
        } else if (bodyId === 'career-page-body' && data.careerPage) {
            loadCareerPage(data.careerPage);
        } else if (bodyId === 'education-page-body' && data.educationPage) {
            loadEducationPage(data.educationPage);
        } else if (bodyId === 'getintouch-page-body' && data.getInTouchPage) {
            loadGetInTouchPage(data.getInTouchPage);
        } else if (bodyId === 'skill-page-body') {
            // skill.html의 경우, 헤더는 loadCommonHeader를 통해 이미 로드됨.
            // skill.html의 특정 요소에 데이터를 채우는 로직이 필요하다면 여기에 추가.
            // 예: 푸터 텍스트 (현재 skill.html에는 푸터 P 태그가 없음)
            // 만약 data.json에 skillPage 섹션이 있고, 해당 내용을 동적으로 로드하고 싶다면,
            // if (data.skillPage) { loadSkillPage(data.skillPage); } 와 같이 호출.
            // 현재는 skill.html의 메인 콘텐츠는 정적으로 유지.
            // 공통 헤더의 프로필 사진은 loadCommonHeader에서 이미 처리됨.
        }

    } catch (error) {
        console.error("Could not load data.json:", error);
        // 사용자에게 오류를 알리는 UI 처리 (옵션)
    }
}

function loadCommonHeader(commonData) {
    const headerLogoContainer = document.getElementById('header-logo-container');
    if (headerLogoContainer && commonData.logoSvg) {
        headerLogoContainer.innerHTML = commonData.logoSvg;
    }

    const headerTitle = document.getElementById('header-title');
    if (headerTitle && commonData.portfolioTitle) {
        headerTitle.textContent = commonData.portfolioTitle;
    }

    const headerNavLinks = document.getElementById('header-nav-links');
    if (headerNavLinks && commonData.navLinks) {
        headerNavLinks.innerHTML = ''; // 기존 링크 삭제
        commonData.navLinks.forEach(link => {
            const a = document.createElement('a');
            
            // 페이지별 기본 링크 스타일 설정
            if (document.body.id === 'project-page-body' || document.body.id === 'getintouch-page-body') {
                 a.className = "text-slate-700 hover:text-blue-600 text-sm font-medium leading-normal transition-colors";
            } else if (document.body.id === 'career-page-body' || document.body.id === 'education-page-body') {
                a.className = "text-sm font-medium text-slate-700 hover:text-blue-600 transition-colors";
            } else { // index.html, skill.html 및 기타 기본값 적용 페이지
                a.className = "text-gray-700 hover:text-primary text-sm font-medium";
            }

            a.href = link.href;
            a.textContent = link.text;

            let isActive = window.location.pathname.endsWith(link.href.split('#')[0]);
            if (link.href.includes('#') && window.location.pathname.endsWith(link.href.split('#')[0])) {
                // 해시가 있는 링크의 경우 (예: index.html#about-section)
                // 현재는 경로만 일치하면 활성화. 필요시 해시까지 정확히 일치하도록 로직 추가 가능.
            }
             // getintouch.html의 Contact 링크는 JSON의 active 플래그로 활성화
            if (link.text === "Contact" && link.active && document.body.id === 'getintouch-page-body') {
                 isActive = true;
            }
            // skill.html의 Skills 링크 활성화 (경로 기반)
             if (link.text === "Skills" && document.body.id === 'skill-page-body') {
                isActive = true;
            }


            if (isActive) {
                if (document.body.id === 'getintouch-page-body' && link.text === "Contact" && link.active) {
                    a.classList.add('text-blue-600', 'font-semibold');
                    a.classList.remove('text-slate-700', 'text-gray-700');
                } else if (document.body.id === 'index-page-body' || document.body.id === 'skill-page-body') {
                    a.classList.add('text-primary');
                    a.classList.remove('text-gray-700');
                } else { 
                    a.classList.add('text-blue-600'); 
                    a.classList.remove('text-slate-700', 'text-gray-700');
                }
            }
            headerNavLinks.appendChild(a);
        });
    }

    const headerProfilePic = document.getElementById('header-profile-picture');
    if (headerProfilePic && commonData.profilePictureHeader) {
        // headerProfilePic의 클래스에 md:block 이 있으므로 작은 화면에서는 숨겨짐.
        // skill.html에는 md:block이 없었으나, 통일성을 위해 js에서 제어하기보다 skill.html 자체에 md:block을 넣어주는 것이 좋음.
        // skill.html의 div#header-profile-picture에 hidden md:block 클래스를 추가해줌.
        headerProfilePic.style.backgroundImage = `url("${commonData.profilePictureHeader}")`;
        if (document.body.id === 'skill-page-body'){
             headerProfilePic.classList.remove('hidden'); // skill.html에서 보이도록. (원래 skill.html은 hidden X)
             headerProfilePic.classList.add('md:block'); // md 이상에서만 보이도록.
        }
    }
}

function loadIndexPage(pageData, commonData) {
    const headerTitle = document.getElementById('header-title');
    if (headerTitle && commonData.portfolioTitle) {
        headerTitle.textContent = commonData.portfolioTitle;
    }

    const mainProfilePic = document.getElementById('main-profile-picture');
    if (mainProfilePic && pageData.profilePictureMain) mainProfilePic.style.backgroundImage = `url("${pageData.profilePictureMain}")`;

    setTextContent('user-name', pageData.name);
    setTextContent('user-job-title', pageData.jobTitle);
    setTextContent('user-location', pageData.location);
    setTextContent('user-bio', pageData.bio);
    setTextContent('featured-projects-title', pageData.featuredProjectsTitle);

    const projectsContainer = document.getElementById('featured-projects-container');
    if (projectsContainer && pageData.featuredProjects) {
        projectsContainer.innerHTML = '';
        pageData.featuredProjects.forEach(project => {
            const projectDiv = document.createElement('div');
            projectDiv.className = "flex flex-col gap-4 bg-white rounded-xl shadow-lg overflow-hidden transition-all hover:shadow-xl";
            projectDiv.innerHTML = `
                <div class="w-full bg-center bg-no-repeat aspect-video bg-cover" style='background-image: url("${project.image || ''}");'></div>
                <div class="p-5">
                    <h3 class="text-gray-900 text-lg font-semibold mb-1">${project.title || ''}</h3>
                    <p class="text-slate-600 text-sm">${project.description || ''}</p>
                </div>
            `;
            projectsContainer.appendChild(projectDiv);
        });
    }

    const viewAllBtnText = document.getElementById('view-all-projects-btn-text');
    const viewAllBtnIcon = document.getElementById('view-all-projects-btn-icon');
    const viewAllBtnLink = document.getElementById('view-all-projects-button-link');
    if (viewAllBtnText && pageData.viewAllProjectsButton) setTextContent('view-all-projects-btn-text', pageData.viewAllProjectsButton.text);
    if (viewAllBtnIcon && pageData.viewAllProjectsButton) setTextContent('view-all-projects-btn-icon', pageData.viewAllProjectsButton.icon);
    if (viewAllBtnLink && pageData.viewAllProjectsButton) viewAllBtnLink.href = pageData.viewAllProjectsButton.href;


    setTextContent('footer-text', pageData.footerText);
}

function loadProjectPage(pageData) {
    const headerLogoContainer = document.getElementById('header-logo-container');
    if (headerLogoContainer && pageData.logoSvg) {
        headerLogoContainer.innerHTML = pageData.logoSvg;
    }
    const headerTitle = document.getElementById('header-title');
    if (headerTitle && pageData.headerTitle) {
        headerTitle.textContent = pageData.headerTitle;
    }

    const projectNavLinks = document.getElementById('header-nav-links');
    if (projectNavLinks && pageData.navLinks) {
        projectNavLinks.innerHTML = ''; 
        // loadCommonHeader에서 이미 navLinks를 만들었을 것이므로, 여기서는 Resume 버튼만 추가하거나,
        // projectPage.navLinks가 commonData.navLinks와 다르다면 여기서 다시 그려야 함.
        // 현재 data.json 구조상 projectPage.navLinks가 common.navLinks를 대체함.
        pageData.navLinks.forEach(link => {
            const a = document.createElement('a');
            a.className = "text-slate-700 hover:text-blue-600 text-sm font-medium leading-normal transition-colors";
            a.href = link.href;
            a.textContent = link.text;
            if (window.location.pathname.endsWith(link.href.split('#')[0]) && link.href === "project.html") { // Projects 링크 활성화
                a.classList.add('text-blue-600', 'font-semibold');
                a.classList.remove('text-slate-700');
            }
            projectNavLinks.appendChild(a);
        });
        
        if (pageData.resumeButton) {
            const resumeButton = document.createElement('a'); 
            resumeButton.href = pageData.resumeButton.href || "#";
            resumeButton.className = "flex items-center gap-2 min-w-[84px] cursor-pointer justify-center overflow-hidden rounded-lg h-10 px-4 bg-blue-600 hover:bg-blue-700 text-slate-50 text-sm font-bold leading-normal tracking-[0.015em] transition-colors";
            resumeButton.innerHTML = `
                <span class="truncate">${pageData.resumeButton.text || 'Resume'}</span>
                <span class="material-icons text-base">${pageData.resumeButton.icon || 'download'}</span>`;
            projectNavLinks.appendChild(resumeButton);
        }
    }


    setTextContent('featured-projects-title', pageData.pageTitle);

    const projectsContainer = document.getElementById('projects-list-container');
    if (projectsContainer && pageData.projects) {
        projectsContainer.innerHTML = '';
        pageData.projects.forEach(project => {
            const tagsHtml = project.tags.map(tag => {
                let bgColorClass = 'bg-gray-100 text-gray-700'; 
                if (tag.toLowerCase().includes('react')) bgColorClass = 'bg-blue-100 text-blue-700';
                else if (tag.toLowerCase().includes('node.js')) bgColorClass = 'bg-green-100 text-green-700';
                else if (tag.toLowerCase().includes('mongodb')) bgColorClass = 'bg-purple-100 text-purple-700';
                else if (tag.toLowerCase().includes('swift')) bgColorClass = 'bg-yellow-100 text-yellow-700';
                else if (tag.toLowerCase().includes('firebase')) bgColorClass = 'bg-red-100 text-red-700';
                else if (tag.toLowerCase().includes('uikit')) bgColorClass = 'bg-indigo-100 text-indigo-700';
                else if (tag.toLowerCase().includes('python')) bgColorClass = 'bg-pink-100 text-pink-700';
                else if (tag.toLowerCase().includes('flask')) bgColorClass = 'bg-blue-100 text-blue-700'; // React와 동일, 구분 필요시 변경
                else if (tag.toLowerCase().includes('plotly')) bgColorClass = 'bg-orange-100 text-orange-700';
                return `<span class="${bgColorClass} text-xs font-semibold px-2.5 py-0.5 rounded-full">${tag}</span>`;
            }).join('');

            const projectElement = document.createElement('div');
            projectElement.className = "bg-white rounded-xl shadow-lg overflow-hidden transition-all hover:shadow-xl";
            projectElement.innerHTML = `
                <div class="md:flex">
                    <div class="md:flex-shrink-0">
                        <div class="h-48 w-full object-cover md:w-64 bg-center bg-no-repeat bg-cover" style='background-image: url("${project.image || ''}");'></div>
                    </div>
                    <div class="p-6 flex flex-col justify-between">
                        <div>
                            <h3 class="text-slate-800 text-xl font-semibold leading-tight mb-1">${project.title || ''}</h3>
                            <p class="text-slate-600 text-sm font-normal leading-normal mb-3">${project.description || ''}</p>
                            <div class="flex flex-wrap gap-2 mb-4">
                                ${tagsHtml}
                            </div>
                        </div>
                        <a href="${project.buttonLink || '#'}" class="flex items-center gap-2 min-w-[84px] max-w-fit cursor-pointer justify-center overflow-hidden rounded-md h-9 px-4 bg-slate-100 hover:bg-slate-200 text-slate-700 text-sm font-medium leading-normal transition-colors">
                            <span class="truncate">${project.buttonText || 'View Project'}</span>
                            <span class="material-icons text-base">arrow_forward</span>
                        </a>
                    </div>
                </div>`;
            projectsContainer.appendChild(projectElement);
        });
    }

    setTextContent('work-experience-title', pageData.workExperience?.title);
    const workExpList = document.getElementById('work-experience-list');
    if (workExpList && pageData.workExperience?.experiences) {
        workExpList.innerHTML = '';
        pageData.workExperience.experiences.forEach(exp => {
            const expDiv = document.createElement('div');
            expDiv.className = "bg-white p-6 rounded-xl shadow-lg";
            expDiv.innerHTML = `
                <h3 class="text-slate-800 text-xl font-semibold leading-normal">${exp.jobTitle || ''}</h3>
                <p class="text-slate-500 text-sm font-normal leading-normal mb-2">${exp.period || ''}</p>
                <p class="text-slate-600 text-sm font-normal leading-normal">${exp.description || ''}</p>`;
            workExpList.appendChild(expDiv);
        });
    }

    setTextContent('success-stories-title', pageData.successStories?.title);
    const successStoriesList = document.getElementById('success-stories-list');
    if (successStoriesList && pageData.successStories?.stories) {
        successStoriesList.innerHTML = '';
        pageData.successStories.stories.forEach(story => {
            const storyDiv = document.createElement('div');
            storyDiv.className = "bg-white rounded-xl shadow-lg overflow-hidden transition-all hover:shadow-xl";
            storyDiv.innerHTML = `
                <div class="md:flex md:flex-row-reverse">
                    <div class="md:flex-shrink-0">
                        <div class="h-48 w-full object-cover md:w-64 bg-center bg-no-repeat bg-cover" style='background-image: url("${story.image || ''}");'></div>
                    </div>
                    <div class="p-6 flex flex-col justify-between">
                        <div>
                            <h3 class="text-slate-800 text-xl font-semibold leading-tight mb-1">${story.title || ''}</h3>
                            <p class="text-slate-600 text-sm font-normal leading-normal mb-3">${story.description || ''}</p>
                        </div>
                        <a href="${story.buttonLink || '#'}" class="flex items-center gap-2 min-w-[84px] max-w-fit cursor-pointer justify-center overflow-hidden rounded-md h-9 px-4 bg-slate-100 hover:bg-slate-200 text-slate-700 text-sm font-medium leading-normal transition-colors">
                            <span class="truncate">${story.buttonText || 'Read More'}</span>
                            <span class="material-icons text-base">arrow_forward</span>
                        </a>
                    </div>
                </div>`;
            successStoriesList.appendChild(storyDiv);
        });
    }

    setTextContent('footer-text', pageData.footerText);
    const socialLinksContainer = document.getElementById('social-links-container');
    if (socialLinksContainer && pageData.socialLinks) {
        socialLinksContainer.innerHTML = '';
        pageData.socialLinks.forEach(link => {
            const a = document.createElement('a');
            a.className = "text-slate-600 hover:text-blue-600 transition-colors";
            a.href = link.href || '#';
            a.textContent = link.name || '';
            socialLinksContainer.appendChild(a);
        });
    }
}


function loadCareerPage(pageData) {
    const headerLogoContainer = document.getElementById('header-logo-container');
    if (headerLogoContainer && pageData.logoSvg) {
        headerLogoContainer.innerHTML = pageData.logoSvg;
    }
    const headerTitle = document.getElementById('header-title');
    if (headerTitle && pageData.headerTitle) {
        headerTitle.textContent = pageData.headerTitle;
    }

    const careerNavLinks = document.getElementById('header-nav-links');
    if (careerNavLinks && pageData.navLinks) {
        careerNavLinks.innerHTML = '';
        // common.navLinks 대신 careerPage.navLinks 사용. loadCommonHeader 호출 후 실행되므로 덮어씀.
        pageData.navLinks.forEach(link => {
            const a = document.createElement('a');
            a.className = "text-sm font-medium text-slate-700 hover:text-blue-600 transition-colors";
            a.href = link.href;
            a.textContent = link.text;
            // career.html에는 활성화될만한 자체 페이지 링크가 없음 (만약 Resume를 career.html로 본다면 추가)
            // 현재는 common.navLinks에 따라 활성화되도록 loadCommonHeader를 따르는 것이 일관성 있음.
            // 이 부분을 loadCommonHeader와 유사하게 수정하거나, careerPage.navLinks를 common.navLinks와 맞춤.
            // 일단 data.json의 careerPage.navLinks를 사용하되, 활성화 로직은 loadCommonHeader에 맡기는 것이 좋음.
            // 여기서는 careerPage.navLinks에 명시된 링크만 그림. 활성화는 loadCommonHeader의 로직을 따름.
             if (window.location.pathname.endsWith(link.href.split('#')[0])) {
                let isActive = true;
                // career.html 은 특정 링크(예: Resume)가 자신을 가리킬 때 활성화되도록 할 수 있음
                // 현재 data.json의 careerPage.navLinks에는 career.html로 직접 연결되는 링크가 없음.
                // Skills 링크가 career.html을 가리킨다면 아래와 같이 처리
                 if (link.href === "skill.html" && document.body.id === 'career-page-body' ) { // 예시: Skills가 이 페이지의 메인이라면
                    //  a.classList.add('text-blue-600', 'font-semibold');
                    //  a.classList.remove('text-slate-700');
                 } else if (isActive && !link.href.includes("index.html")) { // 다른 페이지로 가는 링크 활성화 (일반적이지 않음)
                    // a.classList.add('text-blue-600', 'font-semibold');
                    // a.classList.remove('text-slate-700');
                 }
             }
            careerNavLinks.appendChild(a);
        });
        
        if (pageData.profilePicture) {
            const profilePicDiv = document.createElement('div');
            profilePicDiv.className = "bg-center bg-no-repeat aspect-square bg-cover rounded-full size-10 border-2 border-slate-200 shadow-sm";
            profilePicDiv.style.backgroundImage = `url("${pageData.profilePicture}")`;
            careerNavLinks.appendChild(profilePicDiv);
        }
    }

    setTextContent('page-title', pageData.pageTitle);

    const timelineContainer = document.getElementById('career-timeline-container');
    if (timelineContainer && pageData.careerEntries) {
        timelineContainer.innerHTML = '';
        pageData.careerEntries.forEach((entry, index) => {
            const responsibilitiesHtml = entry.responsibilities.map(r => `<li>${r}</li>`).join('');
            const achievementsHtml = entry.achievements ? entry.achievements.map(a => `<li>${a}</li>`).join('') : '';
            const achievementsSectionHtml = entry.achievements ? `
                <h4 class="text-md font-semibold text-slate-800 mb-2">${entry.achievementsTitle || 'Achievements:'}</h4>
                <ul class="list-disc list-inside text-sm text-slate-600 space-y-1">
                    ${achievementsHtml}
                </ul>` : '';

            const entryDiv = document.createElement('div');
            let entryDivClassName = "mb-12 relative";
            if (index === pageData.careerEntries.length - 1) {
                 entryDivClassName = "relative"; // 마지막 요소는 mb-12 제거
            }
            entryDiv.className = entryDivClassName;

            entryDiv.innerHTML = `
                <div class="absolute -left-[21px] top-1.5 flex h-10 w-10 items-center justify-center rounded-full bg-blue-600 text-white shadow-md">
                    <span class="material-icons">${entry.icon || 'work'}</span>
                </div>
                <div class="pl-4">
                    <h3 class="text-xl font-semibold text-slate-900">${entry.jobTitle || ''}</h3>
                    <p class="text-sm text-slate-500 mb-2">${entry.company || ''} | ${entry.period || ''}</p>
                    <div class="bg-white p-6 rounded-lg shadow-lg border border-slate-200">
                        <h4 class="text-md font-semibold text-slate-800 mb-2">${entry.responsibilitiesTitle || 'Role & Responsibilities:'}</h4>
                        <ul class="list-disc list-inside text-sm text-slate-600 space-y-1 mb-3">
                            ${responsibilitiesHtml}
                        </ul>
                        ${achievementsSectionHtml}
                    </div>
                </div>`;
            timelineContainer.appendChild(entryDiv);
        });
    }
    setTextContent('footer-text', pageData.footerText);
}

function loadEducationPage(pageData) {
    const headerLogoContainer = document.getElementById('header-logo-container');
    if (headerLogoContainer && pageData.logoSvg) { 
        headerLogoContainer.innerHTML = pageData.logoSvg; // educationPage 전용 로고 사용
    }
    const headerTitle = document.getElementById('header-title');
    if (headerTitle && pageData.headerTitle) {
        headerTitle.textContent = pageData.headerTitle;
    }

    const eduNavLinks = document.getElementById('header-nav-links');
    if (eduNavLinks && pageData.navLinks) {
        eduNavLinks.innerHTML = '';
        // educationPage.navLinks 사용
        pageData.navLinks.forEach(link => {
            const a = document.createElement('a');
            a.className = "text-sm font-medium text-slate-700 hover:text-blue-600 transition-colors";
            a.href = link.href;
            a.textContent = link.text;
            // education.html에는 명시적으로 활성화할 자체 링크가 data.json에 없음.
            // 활성화는 loadCommonHeader의 로직을 따르도록 하는 것이 좋음.
            eduNavLinks.appendChild(a);
        });
        
        if (pageData.notificationIcon) {
            const notificationButton = document.createElement('button');
            notificationButton.className = "flex items-center justify-center rounded-full h-10 w-10 bg-slate-100 text-slate-700 hover:bg-slate-200 transition-colors";
            notificationButton.innerHTML = `<span class="material-icons text-xl">${pageData.notificationIcon}</span>`;
            eduNavLinks.appendChild(notificationButton);
        }
        if (pageData.profilePicture) {
            const profilePicDiv = document.createElement('div');
            profilePicDiv.className = "bg-center bg-no-repeat aspect-square bg-cover rounded-full size-10 border-2 border-slate-200 hover:border-blue-600 transition-all";
            profilePicDiv.style.backgroundImage = `url("${pageData.profilePicture}")`;
            eduNavLinks.appendChild(profilePicDiv);
        }
    }

    setTextContent('page-title', pageData.pageTitle);
    setTextContent('academic-title', pageData.academicBackground?.title);
    const academicList = document.getElementById('academic-list-container');
    if (academicList && pageData.academicBackground?.entries) {
        academicList.innerHTML = '';
        pageData.academicBackground.entries.forEach(entry => {
            const div = document.createElement('div');
            div.className = "flex items-start gap-6 p-6 bg-white rounded-xl shadow-lg hover:shadow-xl transition-shadow";
            div.innerHTML = `
                <div class="flex items-center justify-center rounded-lg bg-blue-500 text-white shrink-0 size-12">
                    <span class="material-icons text-2xl">${entry.icon || 'school'}</span>
                </div>
                <div class="flex-1">
                    <h3 class="text-slate-900 text-lg font-semibold">${entry.institution || ''}</h3>
                    <p class="text-slate-600 text-sm">${entry.major || ''}</p>
                    <p class="text-slate-500 text-xs mt-1">${entry.graduation || ''}</p>
                    <p class="text-slate-700 text-sm mt-2">${entry.achievement || ''}</p>
                </div>`;
            academicList.appendChild(div);
        });
    }

    setTextContent('certifications-title', pageData.certifications?.title);
    const certList = document.getElementById('certifications-list-container');
    if (certList && pageData.certifications?.entries) {
        certList.innerHTML = '';
        pageData.certifications.entries.forEach(entry => {
             const div = document.createElement('div');
            div.className = "flex items-start gap-6 p-6 bg-white rounded-xl shadow-lg hover:shadow-xl transition-shadow";
            div.innerHTML = `
                <div class="flex items-center justify-center rounded-lg bg-emerald-500 text-white shrink-0 size-12">
                    <span class="material-icons text-2xl">${entry.icon || 'workspace_premium'}</span>
                </div>
                <div class="flex-1">
                    <h3 class="text-slate-900 text-lg font-semibold">${entry.name || ''}</h3>
                    <p class="text-slate-600 text-sm">${entry.issued || ''}</p>
                    <p class="text-slate-500 text-xs mt-1">${entry.validUntil || ''}</p>
                    <p class="text-slate-700 text-sm mt-2">${entry.description || ''}</p>
                </div>`;
            certList.appendChild(div);
        });
    }

    setTextContent('training-title', pageData.additionalTraining?.title);
    const trainingList = document.getElementById('training-list-container');
    if (trainingList && pageData.additionalTraining?.entries) {
        trainingList.innerHTML = '';
        pageData.additionalTraining.entries.forEach(entry => {
            const div = document.createElement('div');
            div.className = "flex items-start gap-6 p-6 bg-white rounded-xl shadow-lg hover:shadow-xl transition-shadow";
            div.innerHTML = `
                <div class="flex items-center justify-center rounded-lg bg-purple-500 text-white shrink-0 size-12">
                    <span class="material-icons text-2xl">${entry.icon || 'model_training'}</span>
                </div>
                <div class="flex-1">
                    <h3 class="text-slate-900 text-lg font-semibold">${entry.course || ''}</h3>
                    <p class="text-slate-600 text-sm">${entry.completed || ''}</p>
                    <p class="text-slate-500 text-xs mt-1">${entry.duration || ''}</p>
                    <p class="text-slate-700 text-sm mt-2">${entry.description || ''}</p>
                </div>`;
            trainingList.appendChild(div);
        });
    }
    setTextContent('footer-text', pageData.footerText);
}

function loadGetInTouchPage(pageData) {
    const headerLogoContainer = document.getElementById('header-logo-container');
     if (headerLogoContainer && pageData.logoSvg) {
        headerLogoContainer.innerHTML = pageData.logoSvg; // getInTouchPage 전용 로고 사용
    }
    const headerTitle = document.getElementById('header-title');
    if (headerTitle && pageData.headerTitle) {
        headerTitle.textContent = pageData.headerTitle;
    }

    const contactNavLinks = document.getElementById('header-nav-links');
    if (contactNavLinks && pageData.navLinks) {
        contactNavLinks.innerHTML = '';
        // getInTouchPage.navLinks 사용
        pageData.navLinks.forEach(link => {
            const a = document.createElement('a');
            // 이 페이지에서는 Contact 링크만 active 플래그로 활성화됨 (loadCommonHeader에서 처리)
            // 여기서는 기본 스타일만 적용하거나, pageData.navLinks의 active 플래그를 직접 사용
            a.className = `text-sm font-medium leading-normal transition-colors ${link.active ? 'text-blue-600 font-semibold' : 'text-slate-700 hover:text-blue-600'}`;
            a.href = link.href;
            a.textContent = link.text;
            contactNavLinks.appendChild(a);
        });

        if (pageData.languageIcon) {
            const langButton = document.createElement('button');
            langButton.className = "flex items-center justify-center rounded-full h-10 w-10 bg-slate-100 hover:bg-slate-200 text-slate-700 transition-colors";
            langButton.innerHTML = `<span class="material-icons text-xl">${pageData.languageIcon}</span>`;
            contactNavLinks.appendChild(langButton);
        }
        if (pageData.profilePicture) {
            const profilePicDiv = document.createElement('div');
            profilePicDiv.className = "bg-center bg-no-repeat aspect-square bg-cover rounded-full size-10 border border-slate-200";
            profilePicDiv.style.backgroundImage = `url("${pageData.profilePicture}")`;
            contactNavLinks.appendChild(profilePicDiv);
        }
    }


    setTextContent('page-title', pageData.pageTitle);
    setTextContent('page-subtitle', pageData.pageSubtitle);

    if (pageData.formLabels) {
        setTextContent('label-name', pageData.formLabels.name);
        setTextContent('label-email', pageData.formLabels.email);
        setTextContent('label-subject', pageData.formLabels.subject);
        setTextContent('label-message', pageData.formLabels.message);
    }
    if (pageData.formPlaceholders) {
        setPlaceholder('input-name', pageData.formPlaceholders.name);
        setPlaceholder('input-email', pageData.formPlaceholders.email);
        setPlaceholder('input-subject', pageData.formPlaceholders.subject);
        setPlaceholder('input-message', pageData.formPlaceholders.message);
    }
    setTextContent('send-button-text', pageData.sendButtonText);
    setTextContent('contact-info-title', pageData.contactInfoTitle);

    const contactDetailsContainer = document.getElementById('contact-details-container');
    if (contactDetailsContainer && pageData.contactDetails) {
        contactDetailsContainer.innerHTML = '';
        pageData.contactDetails.forEach(detail => {
            let iconHtml = '';
            if (detail.icon) {
                iconHtml = `<span class="material-icons text-2xl">${detail.icon}</span>`;
            } else if (detail.iconSvg) {
                iconHtml = detail.iconSvg;
            }
            const div = document.createElement('div');
            div.className = "flex items-start gap-4";
            div.innerHTML = `
                <div class="text-blue-600 flex items-center justify-center rounded-lg bg-blue-100 shrink-0 size-12 mt-1">
                    ${iconHtml}
                </div>
                <div>
                    <p class="text-slate-800 text-base font-semibold leading-normal">${detail.type || ''}</p>
                    <a class="text-slate-600 hover:text-blue-600 text-sm font-normal leading-normal transition-colors" href="${detail.href || '#'}" ${detail.href && detail.href.startsWith('http') ? 'rel="noopener noreferrer" target="_blank"' : ''}>${detail.value || ''}</a>
                </div>`;
            contactDetailsContainer.appendChild(div);
        });
    }
     setTextContent('footer-text', pageData.footerText);
}


// Helper function to set text content if element exists
function setTextContent(id, text) {
    const element = document.getElementById(id);
    if (element && text !== undefined) {
        element.textContent = text;
    } else if (element && text === undefined) {
        element.textContent = ''; 
    }
}
// Helper function to set placeholder if element exists
function setPlaceholder(id, text) {
    const element = document.getElementById(id);
    if (element && text !== undefined) {
        element.placeholder = text;
    }
}