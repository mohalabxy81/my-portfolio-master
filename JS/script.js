/**
 * Portfolio Scripts - Eng. Mohamed Adel Nabih
 * Civil Site & Execution Engineer
 */

document.addEventListener('DOMContentLoaded', () => {

    // -------------------------------------------------------------
    // 1. Loading Screen
    // -------------------------------------------------------------
    const hideLoading = () => {
        const loadingScreen = $("#loading");
        if (loadingScreen.length) {
            loadingScreen.fadeOut(350, () => {
                $("body").css("overflow", "auto");
            });
        }
    };
    window.addEventListener('load', hideLoading);
    // Safety fallback: hide after 2.5 seconds if an asset is slow
    setTimeout(hideLoading, 2500);

    // -------------------------------------------------------------
    // 2. Dynamic Footer Year
    // -------------------------------------------------------------
    const currentYearEl = document.getElementById("currentYear");
    if (currentYearEl) {
        currentYearEl.textContent = new Date().getFullYear();
    }

    // -------------------------------------------------------------
    // 3. Navbar & Sticky State
    // -------------------------------------------------------------
    const navbar = document.querySelector("nav");
    const navToggleBtn = document.getElementById("navbarToggleBtn");
    const navToggleIcon = document.getElementById("navToggleIcon");
    const navbarCollapse = document.getElementById("navbarSupportedContent");
    const navLinks = document.querySelectorAll(".navbar-nav .nav-link");

    // Toggle icon switch
    navToggleBtn?.addEventListener('click', () => {
        setTimeout(() => {
            if (navbarCollapse.classList.contains("show")) {
                navToggleIcon.classList.replace("fa-bars", "fa-times");
            } else {
                navToggleIcon.classList.replace("fa-times", "fa-bars");
            }
        }, 150);
    });

    // -------------------------------------------------------------
    // 4. Smooth Anchor Scrolling & Mobile Menu Collapse
    // -------------------------------------------------------------
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            const href = this.getAttribute('href');
            if (!href || href === '#') return;

            const targetElement = document.querySelector(href);
            if (targetElement) {
                e.preventDefault();

                const navHeight = navbar ? navbar.offsetHeight : 70;
                const elementPosition = targetElement.getBoundingClientRect().top;
                const offsetPosition = elementPosition + window.pageYOffset - navHeight + 5;

                window.scrollTo({
                    top: offsetPosition,
                    behavior: 'smooth'
                });

                // Auto collapse mobile navbar if open
                if (navbarCollapse && navbarCollapse.classList.contains('show')) {
                    const bsCollapse = bootstrap.Collapse.getInstance(navbarCollapse);
                    if (bsCollapse) {
                        bsCollapse.hide();
                    } else {
                        navbarCollapse.classList.remove('show');
                    }
                    if (navToggleIcon) {
                        navToggleIcon.classList.replace("fa-times", "fa-bars");
                    }
                }
            }
        });
    });

    // -------------------------------------------------------------
    // 5. ScrollSpy & Sticky Navbar on Scroll
    // -------------------------------------------------------------
    const sections = document.querySelectorAll("header[id], section[id]");
    const backToTopBtn = document.getElementById("backToTop");

    window.addEventListener('scroll', () => {
        const scrollPosition = window.scrollY;

        // Sticky Navbar
        if (scrollPosition > 80) {
            navbar.classList.add("navbar-sticky");
        } else {
            navbar.classList.remove("navbar-sticky");
        }

        // Back to top button visibility
        if (backToTopBtn) {
            if (scrollPosition > 400) {
                backToTopBtn.classList.add("show");
            } else {
                backToTopBtn.classList.remove("show");
            }
        }

        // Sync Active Nav Link with section scroll
        const navHeight = navbar ? navbar.offsetHeight : 70;
        let currentSectionId = "";

        sections.forEach(section => {
            const sectionTop = section.offsetTop - navHeight - 60;
            const sectionHeight = section.offsetHeight;
            if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
                currentSectionId = section.getAttribute("id");
            }
        });

        if (currentSectionId) {
            navLinks.forEach(link => {
                link.classList.remove("active");
                if (link.getAttribute("href") === `#${currentSectionId}`) {
                    link.classList.add("active");
                }
            });
        }
    });

    // Back to top click
    backToTopBtn?.addEventListener('click', () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });

    // -------------------------------------------------------------
    // 6. Skills Progress Bar Animation (IntersectionObserver)
    // -------------------------------------------------------------
    let skillsTriggered = false;
    const skillsContainer = document.getElementById("skills");

    const animateSkills = () => {
        if (skillsTriggered) return;
        const progressBars = document.querySelectorAll(".skill-progressbar .percentage");
        progressBars.forEach(bar => {
            const target = bar.getAttribute("data-percent");
            if (target) {
                bar.style.width = `${target}%`;
            }
        });
        skillsTriggered = true;
    };

    if (skillsContainer) {
        const skillsObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    animateSkills();
                    skillsObserver.unobserve(entry.target);
                }
            });
        }, { threshold: 0.2 });

        skillsObserver.observe(skillsContainer);
    }

    // -------------------------------------------------------------
    // 7. Impact Numbers Counter Animation (IntersectionObserver)
    // -------------------------------------------------------------
    let countersTriggered = false;
    const statsSection = document.getElementById("stats");

    const runCounters = () => {
        if (countersTriggered) return;
        const counterElements = document.querySelectorAll(".counter");

        counterElements.forEach(counter => {
            const target = parseInt(counter.getAttribute("data-target"), 10);
            if (isNaN(target)) return;

            let current = 0;
            const duration = 1500; // ms
            const stepTime = 30;
            const steps = duration / stepTime;
            const increment = target / steps;

            const timer = setInterval(() => {
                current += increment;
                if (current >= target) {
                    current = target;
                    clearInterval(timer);
                }
                const suffix = target === 100 ? "%" : "+";
                counter.textContent = `${Math.floor(current)}${suffix}`;
            }, stepTime);
        });

        countersTriggered = true;
    };

    if (statsSection) {
        const statsObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    runCounters();
                    statsObserver.unobserve(entry.target);
                }
            });
        }, { threshold: 0.3 });

        statsObserver.observe(statsSection);
    }

    // -------------------------------------------------------------
    // 8. Typed.js Tagline Animation
    // -------------------------------------------------------------
    if (typeof Typed !== 'undefined' && document.getElementById('typed')) {
        new Typed('#typed', {
            strings: [
                "a Civil Site Engineer",
                "a Roads & Infrastructure Specialist",
                "a Structural Concrete Supervisor",
                "a Turnkey Finishing Engineer"
            ],
            typeSpeed: 55,
            backSpeed: 35,
            backDelay: 1600,
            startDelay: 300,
            loop: true,
            showCursor: true,
            cursorChar: '|'
        });
    }

    // -------------------------------------------------------------
    // 9. Slick Slider (Expertise Area)
    // -------------------------------------------------------------
    if ($.fn.slick) {
        $('.slider').slick({
            dots: true,
            infinite: true,
            arrows: false,
            speed: 400,
            autoplay: true,
            autoplaySpeed: 3500,
            slidesToShow: 3,
            slidesToScroll: 1,
            pauseOnHover: true,
            responsive: [
                {
                    breakpoint: 1200,
                    settings: {
                        slidesToShow: 2,
                        slidesToScroll: 1
                    }
                },
                {
                    breakpoint: 768,
                    settings: {
                        slidesToShow: 1,
                        slidesToScroll: 1,
                        centerMode: false
                    }
                }
            ]
        });
    }

    // -------------------------------------------------------------
    // 10. Project Category Filtering with ARIA state
    // -------------------------------------------------------------
    const filterButtons = document.querySelectorAll(".filter-btn");
    const projectItems = document.querySelectorAll(".project-item");

    filterButtons.forEach(btn => {
        btn.addEventListener('click', () => {
            filterButtons.forEach(b => {
                b.classList.remove("active");
                b.setAttribute("aria-pressed", "false");
            });
            btn.classList.add("active");
            btn.setAttribute("aria-pressed", "true");

            const filterValue = btn.getAttribute("data-filter");

            projectItems.forEach(item => {
                const itemCategory = item.getAttribute("data-category");

                if (filterValue === "all" || itemCategory === filterValue) {
                    item.classList.remove("hidden-filter");
                    item.style.opacity = '0';
                    item.style.transform = 'scale(0.95)';
                    setTimeout(() => {
                        item.style.opacity = '1';
                        item.style.transform = 'scale(1)';
                    }, 50);
                } else {
                    item.classList.add("hidden-filter");
                }
            });
        });
    });

    // -------------------------------------------------------------
    // 11. Project Details Modal Dynamic Populator
    // -------------------------------------------------------------
    const projectData = {
        p1: {
            title: "City of Treasures (مدينة الرخام والجرانيت)",
            arabic: "مشروع مدينة الرخام والجرانيت بالعين السخنة",
            category: "Roads & Heavy Infrastructure",
            org: "Armed Forces Engineering Authority (الهيئة الهندسية للقوات المسلحة)",
            desc: "Execution and technical supervision of extensive internal concrete roads and heavy-duty asphalt internal network tailored for heavy transport and industrial marble haulers.",
            highlights: [
                "Supervised subgrade preparation, sub-base compaction, and plate load testing.",
                "Poured high-strength jointed reinforced concrete pavement designed to sustain heavy axle loads.",
                "Implemented asphalt binder and wearing courses adhering to Egyptian highway specifications.",
                "Delivered accurate site shop drawings and coordinated 24/7 pour schedules with zero downtime."
            ]
        },
        p2: {
            title: "Galala City & Resort Complex (مدينة ومنتجع الجلالة)",
            arabic: "مشروع منتجع ومدينة الجلالة العالمية",
            category: "Tourism & Hospitality Megaproject",
            org: "Armed Forces Engineering Authority (الهيئة الهندسية للقوات المسلحة)",
            desc: "Supervised construction of internal asphalt road networks across mountainous terrains, managing complex elevation grading, stormwater drainage, and luxury resort access.",
            highlights: [
                "Managed road alignments, cut-and-fill slopes in challenging rocky topography.",
                "Supervised asphalt paving courses, curbstone installation, and pavement markings.",
                "Integrated underground drainage culverts and stormwater routing networks.",
                "Coordinated with architectural and MEP teams to guarantee seamless infrastructure delivery."
            ]
        },
        p3: {
            title: "Dakhla & East Al Owainat Highway (طريق الداخلة - شرق العوينات)",
            arabic: "مشروع تطوير طريق الداخلة - شرق العوينات الاستراتيجي",
            category: "National Highway Development",
            org: "Armed Forces Engineering Authority (الهيئة الهندسية للقوات المسلحة)",
            desc: "Comprehensive development and widening of a vital inter-city highway connecting agricultural export basins to central Egyptian markets.",
            highlights: [
                "Supervised soil stabilization, sub-base leveling, and continuous compaction testing.",
                "Executed prime coat (MC) and tack coat (RC) bitumen spray followed by asphalt layer placement.",
                "Monitored asphalt temperature control, roller rolling patterns, and surface smoothness index.",
                "Successfully fulfilled rigorous military inspection standards and technical quality audits."
            ]
        },
        p4: {
            title: "Residential Units - West Somid (وحدات سكنية غرب سوميد)",
            arabic: "تشطيب وحدات سكنية وتسليمها - غرب سوميد، 6 أكتوبر",
            category: "Turnkey Interior & Exterior Finishing",
            org: "West Somid Development (شركة غرب سوميد للتطوير العقاري)",
            desc: "Complete site supervision and turnkey execution of interior/exterior finishing across 4 upscale residential units, plus oversight of 5+ concurrent building sites.",
            highlights: [
                "Supervised masonry, cement plastering, MEP first and second fixes.",
                "Executed gypsum board ceilings, concealed LED lighting troughs, and premium marble flooring.",
                "Coordinated exterior facade stone cladding, waterproofing, and acoustic insulation.",
                "Conducted punch-list walkthroughs and final handovers directly to discerning property owners."
            ]
        },
        p5: {
            title: "Industrial Facilities & Factories - Kom Oshim (مصانع منطقة كوم أوشيم الصناعية)",
            arabic: "إنشاء وتنفيذ مصانع متكاملة - منطقة كوم أوشيم الصناعية، الفيوم",
            category: "Industrial Construction & Structural Engineering",
            org: "ArteVo Co. (شركة أرتيفو)",
            desc: "Turnkey structural and civil site engineering for full-scale industrial factory facilities in Kom Oshim Industrial Zone, Fayoum. Encompasses heavy foundations, structural frames, heavy-duty industrial flooring, and industrial finishing.",
            highlights: [
                "Supervised deep and shallow reinforced concrete foundations, structural columns, beams, and pre-engineered steel warehouse frames.",
                "Executed high-tolerance, heavy-duty power-troweled (helicopter) concrete flooring with quartz surface hardeners and joint sealants.",
                "Conducted rebar spacing inspections, formwork verticality checks, slump testing, and compressive cube testing per ECP 203 standards.",
                "Coordinated industrial MEP infrastructure, heavy machinery footings, industrial drainage, and technical quantity surveying."
            ]
        },
        p6: {
            title: "Architectural Finishing & Interior Decor (تشطيبات وديكورات معمارية)",
            arabic: "تنفيذ وإشراف على التشطيبات الفاخرة والديكورات المعمارية",
            category: "Architectural Execution & Interior Decor",
            org: "ArteVo Co. (شركة أرتيفو)",
            desc: "Comprehensive engineering supervision of high-end interior decorations, modern plaster moldings, luxury painting systems, and commercial showroom fit-outs.",
            highlights: [
                "Turnkey execution of luxury living spaces, villas, and commercial boutique interiors.",
                "Managed multidisciplinary subcontractor teams: painters, carpenters, tile-setters, and drywall technicians.",
                "Prepared accurate quantity surveying (حصر الكميات), material submittals, and cost control reports.",
                "Ensured pristine finishes with strict adherence to architectural renderings and design tolerances."
            ]
        }
    };

    const projectModal = document.getElementById('projectModal');
    const modalCategory = document.getElementById('modalCategory');
    const modalTitle = document.getElementById('projectModalLabel');
    const modalArabic = document.getElementById('modalArabic');
    const modalOrg = document.getElementById('modalOrg');
    const modalDesc = document.getElementById('modalDesc');
    const modalHighlights = document.getElementById('modalHighlights');
    let lastTriggerButton = null;

    document.querySelectorAll('.btn-project-detail').forEach(btn => {
        btn.addEventListener('click', function () {
            lastTriggerButton = this;
            const projectId = this.getAttribute('data-project-id');
            const data = projectData[projectId];

            if (data && projectModal) {
                modalCategory.textContent = data.category;
                modalTitle.textContent = data.title;
                modalArabic.textContent = data.arabic;
                modalOrg.textContent = data.org;
                modalDesc.textContent = data.desc;

                modalHighlights.innerHTML = '';
                data.highlights.forEach(item => {
                    const li = document.createElement('li');
                    li.textContent = item;
                    modalHighlights.appendChild(li);
                });

                const modalInstance = new bootstrap.Modal(projectModal);
                modalInstance.show();
            }
        });
    });

    // Accessibility: return focus to trigger when modal closes
    projectModal?.addEventListener('hidden.bs.modal', () => {
        lastTriggerButton?.focus();
    });

    // -------------------------------------------------------------
    // 12. Copy to Clipboard Utility
    // -------------------------------------------------------------
    const copyToast = document.getElementById('copyToast');
    let toastTimer;

    const showCopyToast = (text) => {
        if (!copyToast) return;
        copyToast.textContent = text;
        copyToast.classList.add('show');
        clearTimeout(toastTimer);
        toastTimer = setTimeout(() => {
            copyToast.classList.remove('show');
        }, 2200);
    };

    document.querySelectorAll('.copyable-text').forEach(item => {
        item.addEventListener('click', () => {
            const textToCopy = item.getAttribute('data-copy');
            if (textToCopy) {
                navigator.clipboard.writeText(textToCopy).then(() => {
                    showCopyToast(`Copied "${textToCopy}" to clipboard!`);
                }).catch(() => {
                    showCopyToast(`Copied to clipboard!`);
                });
            }
        });
    });

    // -------------------------------------------------------------
    // 13. Contact Form Handlers (WhatsApp & Email Direct Dispatch)
    // -------------------------------------------------------------
    const getFormData = () => {
        const name = document.getElementById('clientName')?.value.trim();
        const contact = document.getElementById('clientContact')?.value.trim();
        const service = document.getElementById('serviceType')?.value;
        const location = document.getElementById('projectLocation')?.value.trim() || 'Not specified';
        const message = document.getElementById('projectMessage')?.value.trim();

        const alertBox = document.getElementById('formAlert');

        if (!name || !contact || !message) {
            if (alertBox) {
                alertBox.className = 'alert alert-danger mt-3';
                alertBox.textContent = 'Please fill in all required fields (Name, Phone/Contact, and Project Details).';
                alertBox.classList.remove('d-none');
            }
            return null;
        }

        return { name, contact, service, location, message, alertBox };
    };

    // Send via WhatsApp
    document.getElementById('btnSendWhatsApp')?.addEventListener('click', () => {
        const data = getFormData();
        if (!data) return;

        const { name, contact, service, location, message, alertBox } = data;

        const text = `*New Inquiry for Eng. Mohamed Adel Nabih*\n\n` +
            `*Client / Org:* ${name}\n` +
            `*Phone / Contact:* ${contact}\n` +
            `*Service Needed:* ${service}\n` +
            `*Project Location:* ${location}\n` +
            `*Project Details:* ${message}\n\n` +
            `_Sent via Portfolio Webpage_`;

        const encodedText = encodeURIComponent(text);
        const whatsappUrl = `https://wa.me/201558556588?text=${encodedText}`;

        window.open(whatsappUrl, '_blank', 'noopener,noreferrer');

        if (alertBox) {
            alertBox.className = 'alert alert-success mt-3';
            alertBox.textContent = 'Opening WhatsApp with your formatted project inquiry... Thank you!';
            alertBox.classList.remove('d-none');
        }
    });

    // Send via Email
    document.getElementById('btnSendEmail')?.addEventListener('click', () => {
        const data = getFormData();
        if (!data) return;

        const { name, contact, service, location, message, alertBox } = data;

        const subject = encodeURIComponent(`Project Inquiry: ${service} - ${name}`);
        const body = encodeURIComponent(
            `Hello Eng. Mohamed Adel,\n\n` +
            `I would like to inquire about your engineering services for an upcoming project:\n\n` +
            `Name / Organization: ${name}\n` +
            `Contact Phone: ${contact}\n` +
            `Service Required: ${service}\n` +
            `Project Location: ${location}\n\n` +
            `Project Details:\n${message}\n\n` +
            `Best regards,\n${name}`
        );

        const mailtoUrl = `mailto:mohalab_xy81@yahoo.com?subject=${subject}&body=${body}`;
        window.location.href = mailtoUrl;

        if (alertBox) {
            alertBox.className = 'alert alert-success mt-3';
            alertBox.textContent = 'Opening your email client with the pre-filled inquiry... Thank you!';
            alertBox.classList.remove('d-none');
        }
    });

    // -------------------------------------------------------------
    // 14. Scroll-Reveal Entrance Animations (IntersectionObserver)
    // -------------------------------------------------------------
    const revealSelectors = '.reveal, .reveal-left, .reveal-right, .reveal-scale';
    const revealElements = document.querySelectorAll(revealSelectors);

    if (revealElements.length > 0 && 'IntersectionObserver' in window) {
        const revealObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('revealed');
                    revealObserver.unobserve(entry.target);
                }
            });
        }, {
            threshold: 0.12,
            rootMargin: '0px 0px -40px 0px'
        });

        revealElements.forEach(el => {
            revealObserver.observe(el);
        });
    } else {
        // Fallback: show everything immediately if IntersectionObserver not supported
        revealElements.forEach(el => {
            el.classList.add('revealed');
        });
    }

});
