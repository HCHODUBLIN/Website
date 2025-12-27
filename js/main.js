// js/main.js
document.addEventListener('DOMContentLoaded', () => {
    if (typeof NETWORK_DATA === 'undefined') {
        return;
    }

    const sky = document.querySelector('.sky');
    const detailsPanel = document.getElementById('details-panel');
    const detailTitle = document.getElementById('detail-title');
    const detailDescription = document.getElementById('detail-description');

    if (!sky) return;

    // --- Utils ---
    function escapeHtml(str = '') {
        return String(str)
            .replaceAll('&', '&amp;')
            .replaceAll('<', '&lt;')
            .replaceAll('>', '&gt;')
            .replaceAll('"', '&quot;')
            .replaceAll("'", '&#039;');
    }

    function normaliseBadge(b) {
        return String(b || '').trim().toLowerCase();
    }

    // --- 키워드 & 프로젝트 & 출판물 (details-data.js 우선 사용) ---
    let keywords = {};
    let projects = [];
    let publications = [];

    if (typeof DETAILS_DATA !== 'undefined') {
        keywords = DETAILS_DATA.keywords || {};
        projects = DETAILS_DATA.projects || [];
        publications = DETAILS_DATA.publications || [];
    } else {
        if (typeof DETAILS_KEYWORDS !== 'undefined') {
            keywords = DETAILS_KEYWORDS;
        }
        if (typeof DETAILS_ITEMS !== 'undefined') {
            // fallback: DETAILS_ITEMS만 있으면 projects로 두고 publications는 비움
            projects = DETAILS_ITEMS;
            publications = [];
        }
    }

    // star keyword filter
    let activeTag = null;

    // badge highlight filter (within list)
    let activeBadge = null;

    // --- NETWORK_DATA 기반 별 생성 ---
    const nodes = NETWORK_DATA.nodes || [];
    const nodeIdToIndex = {};
    const initialPos = {};

    function slugToTag(node) {
        return node.id;
    }

    function createStars() {
        const rect = sky.getBoundingClientRect();
        const padding = 40;

        nodes.forEach((node, index) => {
            const x = Math.random() * (rect.width - padding * 2) + padding;
            const y = Math.random() * (rect.height - padding * 2) + padding;

            const button = document.createElement('button');
            button.className = 'star';
            button.dataset.id = node.id;

            const tag = slugToTag(node);
            button.dataset.tag = tag;

            button.style.left = `${x}px`;
            button.style.top = `${y}px`;

            initialPos[node.id] = { left: x, top: y };

            button.innerHTML = `
                <span class="star-node" aria-hidden="true"></span>
                <span class="star-label">${escapeHtml(node.label)}</span>
            `;

            sky.appendChild(button);
            nodeIdToIndex[node.id] = index;
        });
    }

    createStars();

    const stars = Array.from(sky.querySelectorAll('.star'));
    if (stars.length === 0) return;

    // --- DETAILS 패널 ---
    function clearDetails() {
        if (detailTitle) detailTitle.textContent = 'Select a keyword';
        if (detailDescription) {
            detailDescription.textContent =
                'Click a keyword in the constellation to explore related work.';
        }

        const projectsList = document.getElementById('projects-list');
        const publicationsList = document.getElementById('publications-list');
        if (projectsList) projectsList.innerHTML = '';
        if (publicationsList) publicationsList.innerHTML = '';

        if (detailsPanel) detailsPanel.classList.remove('details--active');
    }

    // 키워드 설명만 담당
    function showKeywordDetails(tag) {
        if (!detailsPanel || !detailTitle || !detailDescription) return;

        const meta = keywords[tag];
        if (meta) {
            detailTitle.textContent = meta.label || 'Keyword';
            detailDescription.textContent = meta.description || '';
        } else {
            detailTitle.textContent = 'Keyword';
            detailDescription.textContent = '';
        }
        detailsPanel.classList.add('details--active');
    }

    // --- Badge rendering / filtering helpers ---
    function renderBadges(badges = []) {
        if (!badges || badges.length === 0) return '';
        const chips = badges
            .map(
                (b) => `
            <span class="badge" data-badge="${escapeHtml(b)}" title="Filter by: ${escapeHtml(b)}">
                ${escapeHtml(b)}
            </span>`
            )
            .join('');

        const clear = `
            <span class="badge badge-clear" data-badge="__clear__" title="Clear badge filter">
                Clear
            </span>`;

        return `<div class="badges">${chips}${clear}</div>`;
    }

    function getItemBadges(item) {
        // Prefer explicit badges in data
        if (Array.isArray(item.badges) && item.badges.length) return item.badges;

        // Minimal fallback if you haven't added badges yet
        if (item.achievements) return ['Project'];
        if (item.type) return [item.type];
        return [];
    }

    function linkFromDoi(doi) {
        if (!doi) return '';
        return `https://doi.org/${doi}`;
    }

    function renderLinkIcon(href, label) {
        if (!href) return '';
        return `
            <a class="icon-link" href="${href}" target="_blank" rel="noopener noreferrer"
               aria-label="${escapeHtml(label)}" title="${escapeHtml(label)}">
                <svg viewBox="0 0 24 24" width="16" height="16" aria-hidden="true">
                    <path d="M10.6 13.4a1 1 0 0 1 0-1.4l3.6-3.6a3 3 0 1 1 4.2 4.2l-2.2 2.2a3 3 0 0 1-4.2 0 1 1 0 1 1 1.4-1.4 1 1 0 0 0 1.4 0l2.2-2.2a1 1 0 1 0-1.4-1.4l-3.6 3.6a1 1 0 0 1-1.4 0Z"></path>
                    <path d="M13.4 10.6a1 1 0 0 1 0 1.4l-3.6 3.6a3 3 0 1 1-4.2-4.2l2.2-2.2a3 3 0 0 1 4.2 0 1 1 0 1 1-1.4 1.4 1 1 0 0 0-1.4 0l-2.2 2.2a1 1 0 1 0 1.4 1.4l3.6-3.6a1 1 0 0 1 1.4 0Z"></path>
                </svg>
            </a>`;
    }

    function renderPubLinks(item) {
        // Only show for publications / outputs that have links
        const doiHref =
            item?.links?.doi ||
            (item?.doi ? linkFromDoi(item.doi) : '');

        const pdfHref = item?.links?.pdf || item?.links?.pdf_url || '';

        if (!doiHref && !pdfHref) return '';

        return `
            <div class="item-links">
                ${renderLinkIcon(doiHref, 'Open DOI')}
                ${renderLinkIcon(pdfHref, 'Open PDF')}
            </div>
        `;
    }

    function applyBadgeHighlight() {
        const items = document.querySelectorAll('.details-list .item');

        items.forEach((li) => {
            const raw = li.dataset.badges || '';
            const badges = raw
                .split('|')
                .map(normaliseBadge)
                .filter(Boolean);

            const match = !activeBadge || badges.includes(activeBadge);

            li.classList.toggle('is-dimmed', !match);
            li.classList.toggle('is-highlighted', match);
        });

        // Badge chip active state
        const chips = document.querySelectorAll('.badge[data-badge]');
        chips.forEach((chip) => {
            const v = normaliseBadge(chip.dataset.badge);
            chip.classList.toggle('is-active', activeBadge && v === activeBadge);
        });
    }

    // Badge click (event delegation): highlight within the lists
    document.addEventListener('click', (e) => {
        const chip = e.target.closest('.badge[data-badge]');
        if (!chip) return;

        // prevent expanding/collapsing item on badge click
        e.stopPropagation();

        const clickedRaw = chip.dataset.badge;
        const clicked = normaliseBadge(clickedRaw);

        if (clicked === '__clear__') {
            activeBadge = null;
            applyBadgeHighlight();
            return;
        }

        activeBadge = activeBadge === clicked ? null : clicked;
        applyBadgeHighlight();
    });

    // --- 리스트 카드 토글 ---
    function setupItemToggles() {
        const items = document.querySelectorAll('.details-list .item');

        items.forEach((item) => {
            item.addEventListener('click', (e) => {
                const tagName = e.target.tagName.toLowerCase();
                if (tagName === 'a' || tagName === 'button') return;
                if (e.target.closest('.badge')) return; // extra safety

                item.classList.toggle('item--expanded');
            });
        });
    }

    function renderList() {
        const projectsList = document.getElementById('projects-list');
        const publicationsList = document.getElementById('publications-list');

        if (!projectsList || !publicationsList) return;

        projectsList.innerHTML = '';
        publicationsList.innerHTML = '';

        const filteredProjects = projects.filter(
            (item) => !activeTag || (item.tags || []).includes(activeTag)
        );

        const filteredPublications = publications.filter(
            (item) => !activeTag || (item.tags || []).includes(activeTag)
        );

        const renderItem = (item, kind) => {
            const hasAchievements =
                Array.isArray(item.achievements) && item.achievements.length > 0;

            const badges = getItemBadges(item);
            const badgesAttr = badges.join('|');

            const summary = item.summary ? escapeHtml(item.summary) : '';
            const title = item.title ? escapeHtml(item.title) : '';

            // Publications: add DOI/PDF links row if exists
            const linksHtml = kind === 'publication' ? renderPubLinks(item) : '';

            return `
                <li class="item" data-badges="${escapeHtml(badgesAttr)}">
                    <div class="item-head">
                        <h3>${title}</h3>
                        ${renderBadges(badges)}
                    </div>

                    ${linksHtml}

                    <div class="item-extra">
                        ${summary ? `<p class="item-extra-summary">${summary}</p>` : ''}
                        ${hasAchievements
                    ? `
                            <ul class="item-extra-achievements">
                                ${item.achievements.map((a) => `<li>${escapeHtml(a)}</li>`).join('')}
                            </ul>
                        `
                    : ''
                }
                    </div>
                </li>
            `;
        };

        // ----- Projects -----
        if (filteredProjects.length > 0) {
            projectsList.innerHTML = filteredProjects
                .map((item) => renderItem(item, 'project'))
                .join('');
        } else {
            projectsList.innerHTML =
                '<p class="details-empty">No projects found for this keyword.</p>';
        }

        // ----- Publications -----
        if (filteredPublications.length > 0) {
            publicationsList.innerHTML = filteredPublications
                .map((item) => renderItem(item, 'publication'))
                .join('');
        } else {
            publicationsList.innerHTML =
                '<p class="details-empty">No publications found for this keyword.</p>';
        }

        setupItemToggles();
        applyBadgeHighlight();
    }

    // --- NETWORK LINES (SVG) ---
    const svgNS = 'http://www.w3.org/2000/svg';
    const svg = document.createElementNS(svgNS, 'svg');
    svg.classList.add('sky-lines');
    sky.appendChild(svg);

    const rawEdges = NETWORK_DATA.edges || [];
    const edges = [];
    const degrees = new Array(nodes.length).fill(0);

    rawEdges.forEach((edge) => {
        const fromIndex = nodeIdToIndex[edge.from];
        const toIndex = nodeIdToIndex[edge.to];

        if (
            typeof fromIndex === 'number' &&
            typeof toIndex === 'number' &&
            fromIndex !== toIndex
        ) {
            edges.push([fromIndex, toIndex]);
            degrees[fromIndex]++;
            degrees[toIndex]++;
        }
    });

    const maxDegree = Math.max(1, ...degrees);

    function getAnchorRect(star) {
        const node = star.querySelector('.star-node');
        return node ? node.getBoundingClientRect() : star.getBoundingClientRect();
    }

    function drawNetworkLines() {
        svg.innerHTML = '';

        const skyRect = sky.getBoundingClientRect();
        svg.setAttribute('width', skyRect.width);
        svg.setAttribute('height', skyRect.height);
        svg.setAttribute('viewBox', `0 0 ${skyRect.width} ${skyRect.height}`);

        edges.forEach(([fromIndex, toIndex]) => {
            const fromStar = stars[fromIndex];
            const toStar = stars[toIndex];

            if (!fromStar || !toStar) return;

            const fromRect = getAnchorRect(fromStar);
            const toRect = getAnchorRect(toStar);

            const x1 = fromRect.left - skyRect.left + fromRect.width / 2;
            const y1 = fromRect.top - skyRect.top + fromRect.height / 2;
            const x2 = toRect.left - skyRect.left + toRect.width / 2;
            const y2 = toRect.top - skyRect.top + toRect.height / 2;

            const d1 = degrees[fromIndex];
            const d2 = degrees[toIndex];
            const avgDeg = (d1 + d2) / 2;

            const minWidth = 0.3;
            const maxWidth = 0.9;

            const width =
                minWidth + (avgDeg / maxDegree) * (maxWidth - minWidth);

            const line = document.createElementNS(svgNS, 'line');
            line.setAttribute('x1', x1);
            line.setAttribute('y1', y1);
            line.setAttribute('x2', x2);
            line.setAttribute('y2', y2);
            line.setAttribute('stroke', 'rgba(255,255,255,0.45)');
            line.style.strokeWidth = `${width}px`;

            svg.appendChild(line);
        });
    }

    function scheduleRedraw() {
        requestAnimationFrame(() => {
            requestAnimationFrame(() => drawNetworkLines());
        });
    }

    drawNetworkLines();
    window.addEventListener('resize', drawNetworkLines);

    // --- 포커스 / 리셋 ---
    function resetStarPositions() {
        stars.forEach((star) => {
            const id = star.dataset.id;
            const pos = initialPos[id];
            if (pos) {
                star.style.left = `${pos.left}px`;
                star.style.top = `${pos.top}px`;
            }
        });
    }

    function applyFocus(star) {
        const skyRect = sky.getBoundingClientRect();
        const starRect = star.getBoundingClientRect();

        const cx = skyRect.left + skyRect.width / 2;
        const cy = skyRect.top + skyRect.height / 2;
        const sx = starRect.left + starRect.width / 2;
        const sy = starRect.top + starRect.height / 2;

        const factor = 0.25;
        const tx = (cx - sx) * factor;
        const ty = (cy - sy) * factor;

        sky.style.transform = `translate(${tx}px, ${ty}px) scale(1.15)`;
        sky.classList.add('focus-mode');

        drawNetworkLines();
    }

    function resetFocus() {
        sky.style.transform = 'none';
        sky.classList.remove('focus-mode');
    }

    // --- 별 클릭 ---
    stars.forEach((star, index) => {
        star.style.setProperty('--delay', `${index * 0.3}s`);

        star.addEventListener('click', (e) => {
            const tag = star.dataset.tag;
            e.stopPropagation();

            // reset badge filter when switching keyword (optional but sensible)
            activeBadge = null;

            if (activeTag === tag) {
                activeTag = null;
                stars.forEach((s) => s.classList.remove('active'));
                resetFocus();
                clearDetails();
                scheduleRedraw();
                return;
            }

            activeTag = tag;
            stars.forEach((s) => s.classList.toggle('active', s === star));

            applyFocus(star);
            showKeywordDetails(tag);
            renderList();
        });
    });

    // --- 배경 클릭: 선택만 해제 + 줌아웃 ---
    sky.addEventListener('click', (e) => {
        if (e.target.closest('.star')) return;

        resetFocus();

        if (activeTag) {
            activeTag = null;
            stars.forEach((s) => s.classList.remove('active'));
            clearDetails();
        }

        scheduleRedraw();
    });

    // --- 드래그 이동 ---
    let isDragging = false;
    let dragStar = null;
    let dragOffsetX = 0;
    let dragOffsetY = 0;

    stars.forEach((star) => {
        star.addEventListener('mousedown', (e) => {
            isDragging = true;
            dragStar = star;

            const starRect = star.getBoundingClientRect();
            dragOffsetX = e.clientX - starRect.left;
            dragOffsetY = e.clientY - starRect.top;

            e.preventDefault();
            e.stopPropagation();
        });
    });

    window.addEventListener('mousemove', (e) => {
        if (!isDragging || !dragStar) return;

        const skyRect = sky.getBoundingClientRect();
        let newLeft = e.clientX - skyRect.left - dragOffsetX;
        let newTop = e.clientY - skyRect.top - dragOffsetY;

        const maxLeft = skyRect.width - dragStar.offsetWidth;
        const maxTop = skyRect.height - dragStar.offsetHeight;

        newLeft = Math.max(0, Math.min(maxLeft, newLeft));
        newTop = Math.max(0, Math.min(maxTop, newTop));

        dragStar.style.left = `${newLeft}px`;
        dragStar.style.top = `${newTop}px`;

        drawNetworkLines();
    });

    window.addEventListener('mouseup', () => {
        isDragging = false;
        dragStar = null;
    });

    // --- 터치 지원 ---
    stars.forEach((star) => {
        star.addEventListener('touchstart', (e) => {
            const touch = e.touches[0];
            isDragging = true;
            dragStar = star;

            const starRect = star.getBoundingClientRect();
            dragOffsetX = touch.clientX - starRect.left;
            dragOffsetY = touch.clientY - starRect.top;

            e.preventDefault();
            e.stopPropagation();
        });
    });

    window.addEventListener('touchmove', (e) => {
        if (!isDragging || !dragStar) return;

        const touch = e.touches[0];
        const skyRect = sky.getBoundingClientRect();

        let newLeft = touch.clientX - skyRect.left - dragOffsetX;
        let newTop = touch.clientY - skyRect.top - dragOffsetY;

        const maxLeft = skyRect.width - dragStar.offsetWidth;
        const maxTop = skyRect.height - dragStar.offsetHeight;

        newLeft = Math.max(0, Math.min(maxLeft, newLeft));
        newTop = Math.max(0, Math.min(maxTop, newTop));

        dragStar.style.left = `${newLeft}px`;
        dragStar.style.top = `${newTop}px`;

        drawNetworkLines();
        e.preventDefault();
    });

    window.addEventListener('touchend', () => {
        isDragging = false;
        dragStar = null;
    });
});
