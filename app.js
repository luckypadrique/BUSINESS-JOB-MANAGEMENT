(function () {
    'use strict';

    // ==========================================
    // 1. DATA STORE / INITIAL SEED DATA
    // ==========================================

    const DEFAULT_PROFILE = {
        name: 'Acme Corporation',
        ownerName: 'Lucky Gonzales',
        email: 'luckyjgonzales09@gmail.com',
        contactNumber: '+1 (555) 019-2834',
        address: '123 Enterprise Way, Suite 400, Tech City, CA 94016'
    };


    // LOGIN
    window.addEventListener("load", function () {
        const emailInput = document.getElementById("login-email");
        const passwordInput = document.getElementById("login-password");

        if (emailInput) {
            emailInput.value = "";
        }

        if (passwordInput) {
            passwordInput.value = "";
        }
    });

    const DEFAULT_JOBS = [

        {
            id: 'job-1',
            title: 'Pattern Maker',
            description: 'Creates and adjusts clothing patterns based on garment designs and measurements. Ensures patterns are accurate and suitable for production.',
            location: 'Philippines',
            salary: '₱25,000–₱35,000/month',
            employmentType: 'Full-time',
            requirements: '2–5 years experience',
            status: 'Active',
            datePosted: '2026-09-21'
        },
        {
            id: 'job-2',
            title: 'Sewing Machine Operator',
            description: 'Operates industrial sewing machines and assembles garments while maintaining accurate and high-quality stitching.',
            location: 'Philippines',
            salary: '₱18,000–₱25,000/month',
            employmentType: 'Full-time',
            requirements: '2–5 years experience',
            status: 'Active',
            datePosted: '2026-09-21'
        },
        {
            id: 'job-3',
            title: 'Cutting Machine Operator',
            description: 'Cuts fabric accurately according to patterns, measurements, and production specifications while minimizing fabric waste.',
            location: 'Philippines',
            salary: '₱20,000–₱28,000/month',
            employmentType: 'Full-time',
            requirements: '2–5 years experience',
            status: 'Active',
            datePosted: '2026-09-21'
        },
        {
            id: 'job-4',
            title: 'Quality Control Inspector',
            description: 'Checks garments for defects, incorrect measurements, stitching problems, fabric issues, and overall quality before shipment.',
            location: 'Philippines',
            salary: '₱22,000–₱30,000/month',
            employmentType: 'Full-time',
            requirements: '2–5 years experience',
            status: 'Active',
            datePosted: '2026-09-21'
        },
        {
            id: 'job-5',
            title: 'Production Supervisor',
            description: 'Supervises production workers, monitors daily output, manages schedules, and ensures production targets and quality standards are achieved.',
            location: 'Philippines',
            salary: '₱30,000–₱45,000/month',
            employmentType: 'Full-time',
            requirements: '3–7 years experience',
            status: 'Active',
            datePosted: '2026-09-21'
        }
    ];

    const DEFAULT_APPLICANTS = [];

    // Helper to sync database structures in localStorage
    const DB = {
        init() {
            if (!localStorage.getItem('biz_profile')) {
                localStorage.setItem('biz_profile', JSON.stringify(DEFAULT_PROFILE));
            }
            localStorage.setItem('biz_jobs', JSON.stringify(DEFAULT_JOBS));


            // Clean out legacy sample data from localStorage if present
            let storedApplicants = JSON.parse(localStorage.getItem('biz_applicants'));
            if (!storedApplicants || !Array.isArray(storedApplicants)) {
                storedApplicants = [];
            } else {
                storedApplicants = storedApplicants.filter(a => !(
                    a.id === 'app-1' || a.id === 'app-2' || a.id === 'app-3' || a.id === 'app-4' || a.id === 'app-5' ||
                    a.email === 'john.doe@gmail.com' || a.email === 'jane.smith@designco.io' ||
                    a.email === 'alex.j@gotech.net' || a.email === 'emily.davis@marketingsolutions.com' ||
                    a.email === 'm.brown@devopscloud.org' || a.email === 'renz.coloma@gmail.com' ||
                    a.name === 'charmaine pasmo' || a.jobTitle === 'Product Designer'
                ));
            }
            localStorage.setItem('biz_applicants', JSON.stringify(storedApplicants));

            let storedAccounts = JSON.parse(localStorage.getItem('biz_applicant_accounts'));
            if (!storedAccounts || !Array.isArray(storedAccounts)) {
                storedAccounts = [];
            } else {
                storedAccounts = storedAccounts.filter(a => !(a.id === 'app-user-1' || a.email === 'john.doe@gmail.com'));
            }
            localStorage.setItem('biz_applicant_accounts', JSON.stringify(storedAccounts));

            if (!localStorage.getItem('biz_auth')) {
                localStorage.setItem('biz_auth', JSON.stringify({ isLoggedIn: false, currentUser: null, role: 'owner' }));
            }
        },
        getProfile() {
            return JSON.parse(localStorage.getItem('biz_profile'));
        },
        saveProfile(profile) {
            localStorage.setItem('biz_profile', JSON.stringify(profile));
        },
        getJobs() {
            return JSON.parse(localStorage.getItem('biz_jobs')) || [];
        },
        saveJobs(jobs) {
            localStorage.setItem('biz_jobs', JSON.stringify(jobs));
        },
        getApplicants() {
            const list = JSON.parse(localStorage.getItem('biz_applicants')) || [];
            return list.filter(a => !(
                a.id === 'app-1' || a.id === 'app-2' || a.id === 'app-3' || a.id === 'app-4' || a.id === 'app-5' ||
                a.email === 'john.doe@gmail.com' || a.email === 'jane.smith@designco.io' ||
                a.email === 'alex.j@gotech.net' || a.email === 'emily.davis@marketingsolutions.com' ||
                a.email === 'm.brown@devopscloud.org' || a.email === 'renz.coloma@gmail.com'
            ));
        },
        saveApplicants(applicants) {
            localStorage.setItem('biz_applicants', JSON.stringify(applicants));
        },
        getApplicantAccounts() {
            const list = JSON.parse(localStorage.getItem('biz_applicant_accounts')) || [];
            return list.map(acc => ({
                ...acc,
                workExperience: acc.workExperience || [],
                education: acc.education || [],
                resumeFile: acc.resumeFile || null,
                diplomaFile: acc.diplomaFile || null,
                address: acc.address || '',
                dateOfBirth: acc.dateOfBirth || '',
                professionalSummary: acc.professionalSummary || '',
                yearsOfExperience: acc.yearsOfExperience || 0
            })).filter(a => !(a.id === 'app-user-1' || a.email === 'john.doe@gmail.com'));
        },
        saveApplicantAccounts(accounts) {
            localStorage.setItem('biz_applicant_accounts', JSON.stringify(accounts));
        },
        getAuth() {
            return JSON.parse(localStorage.getItem('biz_auth'));
        },
        saveAuth(auth) {
            localStorage.setItem('biz_auth', JSON.stringify(auth));
        }
    };

    // Initialize DB immediately
    DB.init();

    // ==========================================
    // 2. STATE VARIABLES
    // ==========================================
    let authState = DB.getAuth();
    let jobs = DB.getJobs();
    let applicants = DB.getApplicants();
    let profile = DB.getProfile();

    let activeView = 'dashboard';
    let deleteJobId = null; // Stores target job ID for custom delete confirm modal

    let uploadedRegisterResume = null;
    let uploadedRegisterDiploma = null;
    let uploadedMyResume = null;
    let uploadedMyDiploma = null;

    // ==========================================
    // 3. UI ELEMENT REFERENCES
    // ==========================================
    const el = {
        // Views
        loginView: document.getElementById('view-login'),
        dashboardContainer: document.getElementById('dashboard-container'),
        viewDashboard: document.getElementById('view-dashboard'),
        viewJobList: document.getElementById('view-job-list'),
        viewApplicants: document.getElementById('view-applicants'),
        viewProfile: document.getElementById('view-profile'),
        viewTitle: document.getElementById('view-title'),

        // Nav
        navItems: document.querySelectorAll('.nav-item'),
        sidebar: document.getElementById('app-sidebar'),
        sidebarBackdrop: document.getElementById('sidebar-backdrop'),
        btnSidebarToggle: document.getElementById('btn-sidebar-toggle'),
        sidebarProfileName: document.getElementById('sidebar-profile-name'),
        sidebarAvatarInitials: document.getElementById('sidebar-avatar-initials'),
        headerBusinessName: document.getElementById('header-business-name'),
        headerOwnerName: document.getElementById('header-owner-name'),

        // Login Form
        loginForm: document.getElementById('login-form'),
        loginEmail: document.getElementById('login-email'),
        loginPassword: document.getElementById('login-password'),
        loginErrorContainer: document.getElementById('login-error-container'),
        loginErrorText: document.getElementById('login-error-text'),
        errLoginEmail: document.getElementById('err-login-email'),
        errLoginPassword: document.getElementById('err-login-password'),

        // Dashboard Metrics
        metricTotalJobs: document.getElementById('metric-total-jobs'),
        metricActiveJobs: document.getElementById('metric-active-jobs'),
        metricCompletedJobs: document.getElementById('metric-completed-jobs'),
        metricTotalApplicants: document.getElementById('metric-total-applicants'),
        dashboardApplicantsList: document.getElementById('dashboard-applicants-list'),
        chartPercentageText: document.getElementById('chart-percentage-text'),
        chartPercentageFill: document.getElementById('chart-percentage-fill'),
        breakdownActive: document.getElementById('breakdown-active'),
        breakdownCompleted: document.getElementById('breakdown-completed'),

        // Job List View
        btnPostJobTrigger: document.getElementById('btn-post-job-trigger'),
        jobsGrid: document.getElementById('jobs-grid-container'),
        jobSearchInput: document.getElementById('job-search-input'),
        filterJobStatus: document.getElementById('filter-job-status'),
        filterJobType: document.getElementById('filter-job-type'),

        // Job Form Modal
        modalJobFormBackdrop: document.getElementById('modal-job-form-backdrop'),
        jobForm: document.getElementById('job-form'),
        jobFormId: document.getElementById('job-form-id'),
        jobModalTitle: document.getElementById('job-modal-title'),
        jobTitle: document.getElementById('job-title'),
        jobLocation: document.getElementById('job-location'),
        jobSalary: document.getElementById('job-salary'),
        jobType: document.getElementById('job-type'),
        jobStatus: document.getElementById('job-status'),
        jobDescription: document.getElementById('job-description'),
        jobRequirements: document.getElementById('job-requirements'),
        btnSubmitJobForm: document.getElementById('btn-submit-job-form'),
        btnCancelJobModal: document.getElementById('btn-cancel-job-modal'),
        btnCloseJobModal: document.getElementById('btn-close-job-modal'),

        // Detailed Job Modal
        modalJobDetailBackdrop: document.getElementById('modal-job-detail-backdrop'),
        detailJobTitle: document.getElementById('detail-job-title'),
        detailJobStatus: document.getElementById('detail-job-status'),
        detailJobType: document.getElementById('detail-job-type'),
        detailJobLocation: document.getElementById('detail-job-location'),
        detailJobSalary: document.getElementById('detail-job-salary'),
        detailJobDate: document.getElementById('detail-job-date'),
        detailJobDescription: document.getElementById('detail-job-description'),
        detailJobRequirements: document.getElementById('detail-job-requirements'),
        btnCloseDetailModal: document.getElementById('btn-close-detail-modal'),
        btnCloseDetailModalFooter: document.getElementById('btn-close-detail-modal-footer'),

        // Delete Job Confirm Modal
        modalDeleteConfirmBackdrop: document.getElementById('modal-delete-confirm-backdrop'),
        deleteConfirmJobTitle: document.getElementById('delete-confirm-job-title'),
        btnDeleteConfirm: document.getElementById('btn-delete-confirm'),
        btnDeleteCancel: document.getElementById('btn-delete-cancel'),

        // Applicants View
        applicantsList: document.getElementById('applicants-list'),
        applicantSearchInput: document.getElementById('applicant-search-input'),
        filterApplicantJob: document.getElementById('filter-applicant-job'),

        // Profile View
        profileForm: document.getElementById('profile-form'),
        profileBizName: document.getElementById('profile-biz-name'),
        profileOwnerName: document.getElementById('profile-owner-name'),
        profileEmail: document.getElementById('profile-email'),
        profilePhone: document.getElementById('profile-phone'),
        profileAddress: document.getElementById('profile-address'),
        btnSaveProfile: document.getElementById('btn-save-profile'),

        // Toasts
        toastContainer: document.getElementById('toast-container')
    };

    // ==========================================
    // 4. TOAST ALERTS & UI UTILITIES
    // ==========================================
    function showToast(message, type = 'success') {
        const toast = document.createElement('div');
        toast.className = `toast toast-${type}`;

        let icon = '';
        if (type === 'success') {
            icon = '<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path><polyline points="22 4 12 14.01 9 11.01"></polyline></svg>';
        } else {
            icon = '<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"></circle><line x1="12" y1="8" x2="12" y2="12"></line><line x1="12" y1="16" x2="12.01" y2="16"></line></svg>';
        }

        toast.innerHTML = `${icon}<span>${escapeHTML(message)}</span>`;
        el.toastContainer.appendChild(toast);

        // Auto-remove toast after 3.2 seconds
        setTimeout(() => {
            toast.style.animation = 'slideIn 0.3s reverse forwards';
            toast.addEventListener('animationend', () => {
                toast.remove();
            });
        }, 3000);
    }

    function escapeHTML(str) {
        if (!str) return '';
        return str
            .replace(/&/g, '&amp;')
            .replace(/</g, '&lt;')
            .replace(/>/g, '&gt;')
            .replace(/"/g, '&quot;')
            .replace(/'/g, '&#039;');
    }

    // Generates initials for sidebar avatars
    function getInitials(name) {
        if (!name) return 'OB';
        return name
            .split(' ')
            .map(part => part.charAt(0))
            .slice(0, 2)
            .join('')
            .toUpperCase();
    }

    // Helper to format currency/salary display
    function formatSalary(salary) {
        return salary;
    }


    // Formats date string into readable text (e.g. 2026-08-11 -> Aug 11, 2026)
    function formatDate(dateStr) {
        if (!dateStr) return 'N/A';
        const date = new Date(dateStr);
        if (isNaN(date.getTime())) return dateStr;
        const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
        return `${months[date.getMonth()]} ${date.getDate()}, ${date.getFullYear()}`;
    }

    // ==========================================
    // 5. NAVIGATION / ROUTING VIEW CONTROL
    // ==========================================
    function switchView(viewName) {
        if (viewName === 'logout') {
            handleLogout();
            return;
        }

        activeView = viewName;

        // Hide all views first
        document.querySelectorAll('.view-section').forEach(view => {
            view.classList.remove('active');
        });

        // Handle view titles & rendering logic
        let displayTitle = 'Dashboard';
        if (viewName === 'dashboard') {
            renderDashboard();
            el.viewDashboard.classList.add('active');
            displayTitle = 'Dashboard Analytics';
        } else if (viewName === 'job-list') {
            renderJobList();
            el.viewJobList.classList.add('active');
            displayTitle = 'Job Openings';
        } else if (viewName === 'applicants') {
            renderApplicants();
            el.viewApplicants.classList.add('active');
            displayTitle = 'Applicant Management';
        } else if (viewName === 'profile') {
            populateProfileForm();
            el.viewProfile.classList.add('active');
            displayTitle = 'Business Profile';
        } else if (viewName === 'my-resume') {
            const viewMyResume = document.getElementById('view-my-resume');
            if (viewMyResume) {
                renderMyResumeView();
                viewMyResume.classList.add('active');
                displayTitle = 'My Resume & Profile';
            }
        }

        el.viewTitle.textContent = displayTitle;

        // Highlight sidebar items
        el.navItems.forEach(item => {
            if (item.getAttribute('data-target') === viewName) {
                item.classList.add('active');
            } else {
                item.classList.remove('active');
            }
        });

        // Close responsive sidebar drawer if open
        el.sidebar.classList.remove('mobile-open');
        el.sidebarBackdrop.classList.remove('show');

        // Scroll to top of content body
        document.querySelector('.content-body').scrollTop = 0;
    }

    // Bind view targets in sidebar and other triggers
    el.navItems.forEach(item => {
        item.addEventListener('click', (e) => {
            e.preventDefault();
            const target = item.getAttribute('data-target');
            switchView(target);
        });
    });

    // Bind buttons inside dashboard to redirect pages (e.g. View All Applicants)
    document.querySelectorAll('[data-nav]').forEach(button => {
        button.addEventListener('click', () => {
            switchView(button.getAttribute('data-nav'));
        });
    });

    // Mobile menu toggle listeners
    el.btnSidebarToggle.addEventListener('click', () => {
        el.sidebar.classList.toggle('mobile-open');
        el.sidebarBackdrop.classList.toggle('show');
    });

    el.sidebarBackdrop.addEventListener('click', () => {
        el.sidebar.classList.remove('mobile-open');
        el.sidebarBackdrop.classList.remove('show');
    });

    // ==========================================
    // 6. AUTHENTICATION & LOGIN FLOW
    // ==========================================
    async function hashPassword(password) {
        if (window.crypto && window.crypto.subtle) {
            const encoder = new TextEncoder();
            const data = encoder.encode(password);
            const hashBuffer = await window.crypto.subtle.digest('SHA-256', data);
            const hashArray = Array.from(new Uint8Array(hashBuffer));
            return hashArray.map(b => b.toString(16).padStart(2, '0')).join('');
        }
        let hash = 0;
        for (let i = 0; i < password.length; i++) {
            const char = password.charCodeAt(i);
            hash = ((hash << 5) - hash) + char;
            hash |= 0;
        }
        return 'h_' + Math.abs(hash).toString(16);
    }

    // Card Navigation Handlers
    window.showBusinessLogin = function () {
        const cardBiz = document.getElementById('card-business-login');
        const cardAppLogin = document.getElementById('card-applicant-login');
        const cardAppRegister = document.getElementById('card-applicant-register');
        if (cardBiz) cardBiz.style.display = 'block';
        if (cardAppLogin) cardAppLogin.style.display = 'none';
        if (cardAppRegister) cardAppRegister.style.display = 'none';
        clearLoginForm();
    };

    window.showApplicantLogin = function (prefillEmail = '') {
        const cardBiz = document.getElementById('card-business-login');
        const cardAppLogin = document.getElementById('card-applicant-login');
        const cardAppRegister = document.getElementById('card-applicant-register');
        if (cardBiz) cardBiz.style.display = 'none';
        if (cardAppLogin) cardAppLogin.style.display = 'block';
        if (cardAppRegister) cardAppRegister.style.display = 'none';

        clearApplicantLoginForm();
        if (prefillEmail && typeof prefillEmail === 'string') {
            const emailInput = document.getElementById('applicant-login-email');
            if (emailInput) emailInput.value = prefillEmail;
        }
    };

    function populateRegisterJobDropdown() {
        const select = document.getElementById('register-job-position');
        if (!select) return;
        const currentJobs = DB.getJobs().filter(j => j.status === 'Active');
        if (currentJobs.length > 0) {
            select.innerHTML = currentJobs.map(j =>
                `<option value="${j.id}" data-title="${escapeHTML(j.title)}">${escapeHTML(j.title)}</option>`
            ).join('');
        }
    }

    window.showApplicantRegister = function () {
        const cardBiz = document.getElementById('card-business-login');
        const cardAppLogin = document.getElementById('card-applicant-login');
        const cardAppRegister = document.getElementById('card-applicant-register');
        if (cardBiz) cardBiz.style.display = 'none';
        if (cardAppLogin) cardAppLogin.style.display = 'none';
        if (cardAppRegister) cardAppRegister.style.display = 'block';
        populateRegisterJobDropdown();
        clearApplicantRegisterForm();
    };

    window.showChangePassword = function () {
        const box = document.getElementById('changePasswordBox');
        if (box) box.style.display = 'block';
    };

    window.hideChangePassword = function () {
        const box = document.getElementById('changePasswordBox');
        if (box) box.style.display = 'none';
        const cur = document.getElementById('currentPassword');
        const nPass = document.getElementById('newPassword');
        const cPass = document.getElementById('confirmPassword');
        const msg = document.getElementById('passwordMessage');
        if (cur) cur.value = '';
        if (nPass) nPass.value = '';
        if (cPass) cPass.value = '';
        if (msg) msg.textContent = '';
    };

    window.changePassword = function () {
        const currentPassword = document.getElementById('currentPassword').value;
        const newPassword = document.getElementById('newPassword').value;
        const confirmPassword = document.getElementById('confirmPassword').value;
        const message = document.getElementById('passwordMessage');

        const savedPassword = localStorage.getItem('ownerPassword') || 'Lucky12345';

        if (!currentPassword || !newPassword || !confirmPassword) {
            message.style.color = 'var(--danger)';
            message.textContent = 'Please fill in all fields.';
            return;
        }

        if (currentPassword !== savedPassword) {
            message.style.color = 'var(--danger)';
            message.textContent = 'Incorrect current password.';
            return;
        }

        if (newPassword.length < 6) {
            message.style.color = 'var(--danger)';
            message.textContent = 'Password must be at least 6 characters.';
            return;
        }

        if (newPassword !== confirmPassword) {
            message.style.color = 'var(--danger)';
            message.textContent = 'Passwords do not match.';
            return;
        }

        localStorage.setItem('ownerPassword', newPassword);
        message.style.color = 'var(--success-text)';
        message.textContent = 'Password changed successfully!';
        setTimeout(() => {
            window.hideChangePassword();
            showToast('Owner password updated successfully!');
        }, 1200);
    };

    function checkAuthentication() {
        if (authState.isLoggedIn) {
            if (el.loginView) el.loginView.style.display = 'none';
            if (el.dashboardContainer) el.dashboardContainer.style.display = 'flex';

            updateBizHeaderInfo();

            const navApplicants = document.querySelector('.nav-item[data-target="applicants"]');
            const navBizProfile = document.getElementById('nav-biz-profile') || document.querySelector('.nav-item[data-target="profile"]');
            const navMyResume = document.getElementById('nav-my-resume');

            if (authState.role === 'applicant') {
                if (navApplicants) navApplicants.style.display = 'none';
                if (navBizProfile) navBizProfile.style.display = 'none';
                if (navMyResume) navMyResume.style.display = 'flex';

                if (activeView === 'applicants' || activeView === 'profile') {
                    activeView = 'my-resume';
                }
            } else {
                if (navApplicants) navApplicants.style.display = 'flex';
                if (navBizProfile) navBizProfile.style.display = 'flex';
                if (navMyResume) navMyResume.style.display = 'none';

                if (activeView === 'my-resume') {
                    activeView = 'dashboard';
                }
            }

            switchView(activeView || 'dashboard');
        } else {
            if (el.dashboardContainer) el.dashboardContainer.style.display = 'none';
            if (el.loginView) {
                el.loginView.style.display = 'flex';
                el.loginView.classList.add('active');
            }
            clearLoginForm();
        }
    }

    function handleLogin(email, password) {
        const savedOwnerPassword = 'Lucky12345';

        if ((email === 'luckyjgonzales09@gmail.com' || email === 'owner@demo.com') && password === savedOwnerPassword) {
            authState = { isLoggedIn: true, currentUser: email, role: 'owner' };
            DB.saveAuth(authState);

            showToast('Logged in successfully! Welcome back.');

            if (el.loginErrorContainer) {
                el.loginErrorContainer.style.display = 'none';
            }

            checkAuthentication();
        } else {
            const card = document.getElementById('card-business-login');
            if (card) {
                card.classList.remove('animate-shake');
                void card.offsetWidth;
                card.classList.add('animate-shake');
            }

            el.loginErrorText.textContent = 'Invalid email or password.';
            el.loginErrorContainer.style.display = 'flex';

            el.loginEmail.classList.add('input-error');
            el.loginPassword.classList.add('input-error');
            el.loginPassword.value = ''; // Clear password field on error
        }
    }

    function handleLogout() {
        authState = { isLoggedIn: false, currentUser: null, role: null };
        DB.saveAuth(authState);
        showToast('Logged out successfully.');
        activeView = 'dashboard';
        window.showBusinessLogin();
        checkAuthentication();
    }

    function clearLoginForm() {
        el.loginForm.reset();
        el.loginEmail.classList.remove('input-error');
        el.loginPassword.classList.remove('input-error');
        el.errLoginEmail.style.display = 'none';
        el.errLoginPassword.style.display = 'none';
        el.loginErrorContainer.style.display = 'none';
        window.hideChangePassword();
    }

    function clearApplicantLoginForm() {
        const form = document.getElementById('applicant-login-form');
        if (form) form.reset();

        const errContainer = document.getElementById('applicant-login-error-container');
        if (errContainer) errContainer.style.display = 'none';

        ['applicant-login-email', 'applicant-login-password'].forEach(id => {
            const field = document.getElementById(id);
            if (field) field.classList.remove('input-error');
        });

        const errEmail = document.getElementById('err-applicant-login-email');
        const errPass = document.getElementById('err-applicant-login-password');
        if (errEmail) errEmail.style.display = 'none';
        if (errPass) errPass.style.display = 'none';
    }

    function clearApplicantRegisterForm() {
        const form = document.getElementById('applicant-register-form');
        if (form) form.reset();

        const contactInput = document.getElementById('register-contact');
        if (contactInput) contactInput.value = '+63 ';

        const workContainer = document.getElementById('register-work-exp-container');
        if (workContainer) workContainer.innerHTML = '';

        const eduContainer = document.getElementById('register-education-container');
        if (eduContainer) eduContainer.innerHTML = '';

        uploadedRegisterResume = null;
        uploadedRegisterDiploma = null;

        const resumeFilename = document.getElementById('register-resume-filename');
        const diplomaFilename = document.getElementById('register-diploma-filename');
        if (resumeFilename) {
            resumeFilename.textContent = 'No file selected';
            resumeFilename.style.color = 'var(--text-muted)';
            resumeFilename.style.fontWeight = 'normal';
        }
        if (diplomaFilename) {
            diplomaFilename.textContent = 'No file selected';
            diplomaFilename.style.color = 'var(--text-muted)';
            diplomaFilename.style.fontWeight = 'normal';
        }

        const errContainer = document.getElementById('register-error-container');
        const succContainer = document.getElementById('register-success-container');
        if (errContainer) errContainer.style.display = 'none';
        if (succContainer) succContainer.style.display = 'none';

        ['register-fullname', 'register-email', 'register-password', 'register-confirm-password', 'register-contact'].forEach(id => {
            const field = document.getElementById(id);
            if (field) field.classList.remove('input-error');
        });

        ['err-register-fullname', 'err-register-email', 'err-register-password', 'err-register-confirm-password'].forEach(id => {
            const msg = document.getElementById(id);
            if (msg) msg.style.display = 'none';
        });
    }

    // Business Owner Sign-in submit handler
    el.loginForm.addEventListener('submit', (e) => {
        e.preventDefault();

        let isValid = true;
        const emailVal = el.loginEmail.value.trim();
        const passwordVal = el.loginPassword.value;

        el.loginEmail.classList.remove('input-error');
        el.errLoginEmail.style.display = 'none';
        el.loginPassword.classList.remove('input-error');
        el.errLoginPassword.style.display = 'none';

        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailVal || !emailRegex.test(emailVal)) {
            el.loginEmail.classList.add('input-error');
            el.errLoginEmail.style.display = 'block';
            isValid = false;
        }

        if (!passwordVal) {
            el.loginPassword.classList.add('input-error');
            el.errLoginPassword.style.display = 'block';
            isValid = false;
        }

        if (isValid) {
            handleLogin(emailVal, passwordVal);
        }
    });

    // Applicant Registration submit handler
    const registerForm = document.getElementById('applicant-register-form');
    if (registerForm) {
        registerForm.addEventListener('submit', async (e) => {
            e.preventDefault();

            const fullNameEl = document.getElementById('register-fullname');
            const emailEl = document.getElementById('register-email');
            const passwordEl = document.getElementById('register-password');
            const confirmPasswordEl = document.getElementById('register-confirm-password');
            const contactEl = document.getElementById('register-contact');

            const errContainer = document.getElementById('register-error-container');
            const errText = document.getElementById('register-error-text');
            const succContainer = document.getElementById('register-success-container');
            const succText = document.getElementById('register-success-text');

            errContainer.style.display = 'none';
            succContainer.style.display = 'none';

            ['register-fullname', 'register-email', 'register-password', 'register-confirm-password'].forEach(id => {
                const field = document.getElementById(id);
                if (field) field.classList.remove('input-error');
            });

            ['err-register-fullname', 'err-register-email', 'err-register-password', 'err-register-confirm-password'].forEach(id => {
                const msg = document.getElementById(id);
                if (msg) msg.style.display = 'none';
            });

            let isValid = true;
            const fullName = fullNameEl.value.trim();
            const email = emailEl.value.trim();
            const password = passwordEl.value;
            const confirmPassword = confirmPasswordEl.value;
            const contact = contactEl ? contactEl.value.trim() : '';

            // Validation 1: Required Full Name
            if (!fullName) {
                fullNameEl.classList.add('input-error');
                document.getElementById('err-register-fullname').style.display = 'block';
                isValid = false;
            }

            // Validation 2: Email format
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!email || !emailRegex.test(email)) {
                emailEl.classList.add('input-error');
                document.getElementById('err-register-email').style.display = 'block';
                isValid = false;
            }

            // Validation 3: Password min length
            if (!password || password.length < 6) {
                passwordEl.classList.add('input-error');
                document.getElementById('err-register-password').style.display = 'block';
                isValid = false;
            }

            // Validation 4: Confirm password match
            if (!confirmPassword || password !== confirmPassword) {
                confirmPasswordEl.classList.add('input-error');
                document.getElementById('err-register-confirm-password').style.display = 'block';
                isValid = false;
            }

            if (!isValid) {
                errText.textContent = 'Please correct the errors highlighted above.';
                errContainer.style.display = 'flex';
                return;
            }

            // Check if email already exists
            const existingAccounts = DB.getApplicantAccounts();
            const existingUser = existingAccounts.find(acc => acc.email.toLowerCase() === email.toLowerCase());
            if (existingUser) {
                emailEl.classList.add('input-error');
                errText.textContent = 'An account with this email address already exists.';
                errContainer.style.display = 'flex';
                return;
            }

            const hashedPassword = await hashPassword(password);

            const address = document.getElementById('register-address')?.value.trim() || '';
            const dob = document.getElementById('register-dob')?.value || '';
            const summary = document.getElementById('register-summary')?.value.trim() || '';
            const yearsExp = document.getElementById('register-years-experience')?.value || '0';

            const workExperience = getWorkExperienceFromContainer(document.getElementById('register-work-exp-container'));
            const education = getEducationFromContainer(document.getElementById('register-education-container'));

            const newAccount = {
                id: 'app-user-' + Date.now(),
                fullName,
                email,
                passwordHash: hashedPassword,
                plainPassword: password,
                contactNumber: contact,
                address,
                dateOfBirth: dob,
                professionalSummary: summary,
                yearsOfExperience: parseInt(yearsExp) || 0,
                workExperience,
                education,
                resumeFile: uploadedRegisterResume,
                diplomaFile: uploadedRegisterDiploma,
                createdAt: new Date().toISOString().split('T')[0]
            };

            existingAccounts.push(newAccount);
            DB.saveApplicantAccounts(existingAccounts);

            // Sync with biz_applicants list for Admin Dashboard display
            const allApplicants = DB.getApplicants();
            const existingApplicantRecord = allApplicants.find(a => a.email.toLowerCase() === email.toLowerCase());

            const jobSelect = document.getElementById('register-job-position');
            let selectedJobId = 'job-1';
            let selectedJobTitle = 'Senior Frontend Developer';

            if (jobSelect && jobSelect.options && jobSelect.options.length > 0 && jobSelect.selectedIndex >= 0) {
                const selectedOpt = jobSelect.options[jobSelect.selectedIndex];
                selectedJobId = selectedOpt.value;
                selectedJobTitle = selectedOpt.getAttribute('data-title') || selectedOpt.text;
            }

            if (!existingApplicantRecord) {
                const newApplicantRecord = {
                    id: 'app-' + Date.now(),
                    name: fullName,
                    email: email,
                    jobId: selectedJobId,
                    jobTitle: selectedJobTitle,
                    dateApplied: new Date().toISOString().split('T')[0],
                    status: 'Pending',
                    timestamp: Date.now()
                };
                allApplicants.unshift(newApplicantRecord);
                DB.saveApplicants(allApplicants);
                applicants = allApplicants;
            }

            // Immediately refresh dashboard stats and Recent Applicants table
            renderDashboard();
            renderApplicants();

            succText.textContent = 'Account created successfully! Redirecting to login...';
            succContainer.style.display = 'flex';
            showToast('Account registered successfully!', 'success');

            setTimeout(() => {
                window.showApplicantLogin(email);
            }, 1200);
        });
    }

    // Applicant Login submit handler
    const applicantLoginForm = document.getElementById('applicant-login-form');
    if (applicantLoginForm) {
        applicantLoginForm.addEventListener('submit', async (e) => {
            e.preventDefault();

            const emailEl = document.getElementById('applicant-login-email');
            const passwordEl = document.getElementById('applicant-login-password');
            const errContainer = document.getElementById('applicant-login-error-container');
            const errText = document.getElementById('applicant-login-error-text');

            errContainer.style.display = 'none';
            emailEl.classList.remove('input-error');
            passwordEl.classList.remove('input-error');

            document.getElementById('err-applicant-login-email').style.display = 'none';
            document.getElementById('err-applicant-login-password').style.display = 'none';

            let isValid = true;
            const email = emailEl.value.trim();
            const password = passwordEl.value;

            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!email || !emailRegex.test(email)) {
                emailEl.classList.add('input-error');
                document.getElementById('err-applicant-login-email').style.display = 'block';
                isValid = false;
            }

            if (!password) {
                passwordEl.classList.add('input-error');
                document.getElementById('err-applicant-login-password').style.display = 'block';
                isValid = false;
            }

            if (!isValid) return;

            const accounts = DB.getApplicantAccounts();
            const hashedInput = await hashPassword(password);

            const account = accounts.find(acc =>
                acc.email.toLowerCase() === email.toLowerCase() &&
                (acc.passwordHash === hashedInput || acc.plainPassword === password)
            );

            if (account) {
                authState = {
                    isLoggedIn: true,
                    currentUser: account.email,
                    role: 'applicant',
                    name: account.fullName
                };
                DB.saveAuth(authState);

                showToast(`Logged in successfully! Welcome back, ${account.fullName}.`);
                errContainer.style.display = 'none';
                checkAuthentication();
            } else {
                const card = document.getElementById('card-applicant-login');
                if (card) {
                    card.classList.remove('animate-shake');
                    void card.offsetWidth;
                    card.classList.add('animate-shake');
                }

                errText.textContent = 'Invalid email or password.';
                errContainer.style.display = 'flex';

                emailEl.classList.add('input-error');
                passwordEl.classList.add('input-error');
            }
        });
    }

    // ==========================================
    // 7. HEADER / BUSINESS INFO SETUPS
    // ==========================================
    function updateBizHeaderInfo() {
        if (authState.role === 'applicant') {
            const applicantName = authState.name || authState.currentUser || 'Applicant';
            el.sidebarProfileName.textContent = applicantName;
            el.sidebarAvatarInitials.textContent = getInitials(applicantName);
            el.headerBusinessName.textContent = 'Applicant Portal';
            el.headerOwnerName.textContent = applicantName;

            const roleEl = document.querySelector('.profile-role');
            if (roleEl) roleEl.textContent = 'Job Applicant';
        } else {
            el.sidebarProfileName.textContent = profile.ownerName;
            el.sidebarAvatarInitials.textContent = getInitials(profile.ownerName);
            el.headerBusinessName.textContent = profile.name;
            el.headerOwnerName.textContent = profile.ownerName;

            const roleEl = document.querySelector('.profile-role');
            if (roleEl) roleEl.textContent = 'Business Owner';
        }
    }

    // ==========================================
    // 8. BUSINESS PROFILE VIEW
    // ==========================================
    function populateProfileForm() {
        profile = DB.getProfile();
        el.profileBizName.value = profile.name;
        el.profileOwnerName.value = profile.ownerName;
        el.profileEmail.value = profile.email;
        el.profilePhone.value = profile.contactNumber;
        el.profileAddress.value = profile.address;

        // Reset validations
        document.querySelectorAll('#profile-form .input-field').forEach(input => {
            input.classList.remove('input-error');
        });
        document.querySelectorAll('#profile-form .validation-msg').forEach(msg => {
            msg.style.display = 'none';
        });
    }

    el.profileForm.addEventListener('submit', (e) => {
        e.preventDefault();

        let isValid = true;
        const bizName = el.profileBizName.value.trim();
        const ownerName = el.profileOwnerName.value.trim();
        const email = el.profileEmail.value.trim();
        const phone = el.profilePhone.value.trim();
        const address = el.profileAddress.value.trim();

        // Reset errors
        document.querySelectorAll('#profile-form .input-field').forEach(input => {
            input.classList.remove('input-error');
        });
        document.querySelectorAll('#profile-form .validation-msg').forEach(msg => {
            msg.style.display = 'none';
        });

        if (!bizName) {
            el.profileBizName.classList.add('input-error');
            document.getElementById('err-profile-biz-name').style.display = 'block';
            isValid = false;
        }
        if (!ownerName) {
            el.profileOwnerName.classList.add('input-error');
            document.getElementById('err-profile-owner-name').style.display = 'block';
            isValid = false;
        }
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!email || !emailRegex.test(email)) {
            el.profileEmail.classList.add('input-error');
            document.getElementById('err-profile-email').style.display = 'block';
            isValid = false;
        }
        if (!phone) {
            el.profilePhone.classList.add('input-error');
            document.getElementById('err-profile-phone').style.display = 'block';
            isValid = false;
        }
        if (!address) {
            el.profileAddress.classList.add('input-error');
            document.getElementById('err-profile-address').style.display = 'block';
            isValid = false;
        }

        if (isValid) {
            profile = {
                name: bizName,
                ownerName: ownerName,
                email: email,
                contactNumber: phone,
                address: address
            };

            DB.saveProfile(profile);
            updateBizHeaderInfo();
            showToast('Business profile updated successfully!');
        }
    });

    // ==========================================
    // 9. DASHBOARD RENDER / CALCULATIONS
    // ==========================================
    function renderDashboard() {
        jobs = DB.getJobs();
        applicants = DB.getApplicants();

        // Count stats
        const totalJobsCount = jobs.length;
        const activeJobsCount = jobs.filter(j => j.status === 'Active').length;
        const completedJobsCount = jobs.filter(j => j.status === 'Completed').length;
        const totalApplicantsCount = applicants.length;

        // Animate stats counter updating
        animateCounter(el.metricTotalJobs, totalJobsCount);
        animateCounter(el.metricActiveJobs, activeJobsCount);
        animateCounter(el.metricCompletedJobs, completedJobsCount);
        animateCounter(el.metricTotalApplicants, totalApplicantsCount);

        // Render Recent Applicants table (maximum 5 items, newest first)
        const recentApplicants = [...applicants]
            .sort((a, b) => {
                const timeA = a.timestamp || new Date(a.dateApplied || 0).getTime();
                const timeB = b.timestamp || new Date(b.dateApplied || 0).getTime();
                return timeB - timeA;
            })
            .slice(0, 5);

        if (recentApplicants.length === 0) {
            el.dashboardApplicantsList.innerHTML = `
        <tr>
          <td colspan="4" style="text-align: center; color: var(--text-muted); padding: 2rem;">
            No applicants received yet.
          </td>
        </tr>
      `;
        } else {
            el.dashboardApplicantsList.innerHTML = recentApplicants.map(app => {
                let statusBadgeClass = 'badge-warning';
                if (app.status === 'Accepted') statusBadgeClass = 'badge-success';
                if (app.status === 'Rejected') statusBadgeClass = 'badge-danger';

                return `
          <tr>
            <td style="font-weight: 600;">${escapeHTML(app.name)}</td>
            <td>${escapeHTML(app.jobTitle)}</td>
            <td>${formatDate(app.dateApplied)}</td>
            <td><span class="badge ${statusBadgeClass}">${app.status}</span></td>
          </tr>
        `;
            }).join('');
        }

        // Update fill rate graph widget
        const fillRate = totalJobsCount > 0 ? Math.round((completedJobsCount / totalJobsCount) * 100) : 0;
        el.chartPercentageText.textContent = `${fillRate}%`;
        el.chartPercentageFill.style.width = `${fillRate}%`;

        el.breakdownActive.textContent = activeJobsCount;
        el.breakdownCompleted.textContent = completedJobsCount;
    }

    // Smooth numeric counter animation
    function animateCounter(element, targetValue) {
        const currentValue = parseInt(element.textContent, 10) || 0;
        if (currentValue === targetValue) {
            element.textContent = targetValue;
            return;
        }

        const duration = 400; // ms
        const startTime = performance.now();

        function updateCounter(currentTime) {
            const elapsed = currentTime - startTime;
            const progress = Math.min(elapsed / duration, 1);

            // Easing calculation
            const easeOutQuad = progress * (2 - progress);
            const val = Math.floor(currentValue + (targetValue - currentValue) * easeOutQuad);

            element.textContent = val;

            if (progress < 1) {
                requestAnimationFrame(updateCounter);
            } else {
                element.textContent = targetValue;
            }
        }

        requestAnimationFrame(updateCounter);
    }

    // ==========================================
    // 10. JOB LIST VIEW / CRUD STAGE
    // ==========================================
    function renderJobList() {
        jobs = DB.getJobs();
        applicants = DB.getApplicants();

        const query = el.jobSearchInput.value.toLowerCase().trim();
        const filterStatus = el.filterJobStatus.value;
        const filterType = el.filterJobType.value;

        // Filter jobs
        const filteredJobs = jobs.filter(job => {
            const matchQuery = job.title.toLowerCase().includes(query) || job.location.toLowerCase().includes(query);
            const matchStatus = filterStatus === 'all' || job.status === filterStatus;
            const matchType = filterType === 'all' || job.employmentType === filterType;
            return matchQuery && matchStatus && matchType;
        });

        if (filteredJobs.length === 0) {
            el.jobsGrid.innerHTML = `
        <div class="empty-state" style="grid-column: 1 / -1;">
          <div class="empty-state-icon">
            <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path></svg>
          </div>
          <h4>No Jobs Found</h4>
          <p>We couldn't find any job listing matching your keyword or filter filters. Try altering search query.</p>
          <button class="btn btn-primary btn-outline" id="btn-reset-job-filters">Reset Filters</button>
        </div>
      `;

            const resetBtn = document.getElementById('btn-reset-job-filters');
            if (resetBtn) {
                resetBtn.addEventListener('click', () => {
                    el.jobSearchInput.value = '';
                    el.filterJobStatus.value = 'all';
                    el.filterJobType.value = 'all';
                    renderJobList();
                });
            }
            return;
        }

        el.jobsGrid.innerHTML = filteredJobs.map(job => {
            const isCompleted = job.status === 'Completed';
            const statusBadge = isCompleted ? 'badge-gray' : 'badge-success';
            const typeBadge = 'badge-blue';
            const jobApps = applicants.filter(a => a.jobId === job.id).length;

            return `
        <div class="job-card ${isCompleted ? 'completed' : 'active'}" data-id="${job.id}">
          <div class="job-card-header">
            <h4>${escapeHTML(job.title)}</h4>
            <div class="job-card-meta">
              <span class="badge ${statusBadge}">${job.status}</span>
              <span class="badge ${typeBadge}">${job.employmentType}</span>
            </div>
          </div>
          
          <div class="job-card-info">
            <div class="info-item">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 2a8 8 0 0 0-8 8c0 5.25 8 12 8 12s8-6.75 8-12a8 8 0 0 0-8-8z"></path><circle cx="12" cy="10" r="3"></circle></svg>
              <span>${escapeHTML(job.location)}</span>
            </div>
            <div class="info-item">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="12" y1="1" x2="12" y2="23"></line><path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"></path></svg>
              <span>${escapeHTML(formatSalary(job.salary))}</span>
            </div>
            <div class="info-item">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path><circle cx="9" cy="7" r="4"></circle><path d="M23 21v-2a4 4 0 0 0-3-3.87"></path><path d="M16 3.13a4 4 0 0 1 0 7.75"></path></svg>
              <span>${jobApps} applicant${jobApps === 1 ? '' : 's'}</span>
            </div>
            <div class="info-item">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect><line x1="16" y1="2" x2="16" y2="6"></line><line x1="8" y1="2" x2="8" y2="6"></line><line x1="3" y1="10" x2="21" y2="10"></line></svg>
              <span>Posted: ${formatDate(job.datePosted)}</span>
            </div>
          </div>

          <div class="job-card-actions">
            <button class="action-btn-circle view-job-btn" title="View Job Details" data-id="${job.id}">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path><circle cx="12" cy="12" r="3"></circle></svg>
            </button>
            <button class="action-btn-circle edit-job-btn" title="Edit Job listing" data-id="${job.id}">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"></path><path d="M18.5 2.5a2.121 2.121 0 1 1 3 3L12 15l-4 1 1-4 9.5-9.5z"></path></svg>
            </button>
            <button class="action-btn-circle delete delete-job-btn" title="Delete Job Listing" data-id="${job.id}">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="3 6 5 6 21 6"></polyline><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path><line x1="10" y1="11" x2="10" y2="17"></line><line x1="14" y1="11" x2="14" y2="17"></line></svg>
            </button>
          </div>
        </div>
      `;
        }).join('');

        // Attach listeners for actions dynamically
        document.querySelectorAll('.view-job-btn').forEach(btn => {
            btn.addEventListener('click', () => showJobDetail(btn.getAttribute('data-id')));
        });

        document.querySelectorAll('.edit-job-btn').forEach(btn => {
            btn.addEventListener('click', () => openJobFormModal(btn.getAttribute('data-id')));
        });

        document.querySelectorAll('.delete-job-btn').forEach(btn => {
            btn.addEventListener('click', () => openDeleteConfirmModal(btn.getAttribute('data-id')));
        });
    }

    // Real-time job filtering event bindings
    el.jobSearchInput.addEventListener('input', renderJobList);
    el.filterJobStatus.addEventListener('change', renderJobList);
    el.filterJobType.addEventListener('change', renderJobList);

    // ==========================================
    // 11. JOB FORM - ADD / EDIT MODAL ACTION
    // ==========================================
    function openJobFormModal(jobId = null) {
        // Reset validations
        document.querySelectorAll('#job-form .input-field').forEach(input => {
            input.classList.remove('input-error');
        });
        document.querySelectorAll('#job-form .validation-msg').forEach(msg => {
            msg.style.display = 'none';
        });

        if (jobId) {
            // Edit mode
            const targetJob = jobs.find(j => j.id === jobId);
            if (!targetJob) return;

            el.jobModalTitle.textContent = 'Edit Job Listing';
            el.btnSubmitJobForm.textContent = 'Save Changes';

            el.jobFormId.value = targetJob.id;
            el.jobTitle.value = targetJob.title;
            el.jobLocation.value = targetJob.location;
            el.jobSalary.value = targetJob.salary;
            el.jobType.value = targetJob.employmentType;
            el.jobStatus.value = targetJob.status;
            el.jobDescription.value = targetJob.description;
            el.jobRequirements.value = targetJob.requirements;
        } else {
            // Add mode
            el.jobModalTitle.textContent = 'Post New Job';
            el.btnSubmitJobForm.textContent = 'Post Job';

            el.jobForm.reset();
            el.jobFormId.value = '';
            el.jobStatus.value = 'Active'; // Default
        }

        el.modalJobFormBackdrop.classList.add('show');
        el.jobTitle.focus();
    }

    function closeJobFormModal() {
        el.modalJobFormBackdrop.classList.remove('show');
    }

    el.btnPostJobTrigger.addEventListener('click', () => openJobFormModal());
    el.btnCloseJobModal.addEventListener('click', closeJobFormModal);
    el.btnCancelJobModal.addEventListener('click', closeJobFormModal);

    // Form submit handler
    el.jobForm.addEventListener('submit', (e) => {
        e.preventDefault();

        let isValid = true;
        const id = el.jobFormId.value;
        const titleVal = el.jobTitle.value.trim();
        const locationVal = el.jobLocation.value.trim();
        const salaryVal = el.jobSalary.value.trim();
        const typeVal = el.jobType.value;
        const statusVal = el.jobStatus.value;
        const descVal = el.jobDescription.value.trim();
        const reqVal = el.jobRequirements.value.trim();

        // Reset validations
        document.querySelectorAll('#job-form .input-field').forEach(input => {
            input.classList.remove('input-error');
        });
        document.querySelectorAll('#job-form .validation-msg').forEach(msg => {
            msg.style.display = 'none';
        });

        if (!titleVal) {
            el.jobTitle.classList.add('input-error');
            document.getElementById('err-job-title').style.display = 'block';
            isValid = false;
        }
        if (!locationVal) {
            el.jobLocation.classList.add('input-error');
            document.getElementById('err-job-location').style.display = 'block';
            isValid = false;
        }
        if (!salaryVal) {
            el.jobSalary.classList.add('input-error');
            document.getElementById('err-job-salary').style.display = 'block';
            isValid = false;
        }
        if (!typeVal) {
            el.jobType.classList.add('input-error');
            document.getElementById('err-job-type').style.display = 'block';
            isValid = false;
        }
        if (!descVal || descVal.length < 15) {
            el.jobDescription.classList.add('input-error');
            document.getElementById('err-job-description').style.display = 'block';
            isValid = false;
        }
        if (!reqVal) {
            el.jobRequirements.classList.add('input-error');
            document.getElementById('err-job-requirements').style.display = 'block';
            isValid = false;
        }

        if (isValid) {
            jobs = DB.getJobs();

            if (id) {
                // Edit flow
                jobs = jobs.map(j => {
                    if (j.id === id) {
                        // Update associated applicants cached job titles if title changed
                        if (j.title !== titleVal) {
                            updateApplicantJobTitles(id, titleVal);
                        }

                        return {
                            ...j,
                            title: titleVal,
                            location: locationVal,
                            salary: salaryVal,
                            employmentType: typeVal,
                            status: statusVal,
                            description: descVal,
                            requirements: reqVal
                        };
                    }
                    return j;
                });
                showToast('Job listing updated successfully!');
            } else {
                // Add flow
                const newJob = {
                    id: `job-${Date.now()}`,
                    title: titleVal,
                    location: locationVal,
                    salary: salaryVal,
                    employmentType: typeVal,
                    status: statusVal,
                    description: descVal,
                    requirements: reqVal,
                    datePosted: new Date().toISOString().split('T')[0]
                };
                jobs.push(newJob);
                showToast('New job position posted successfully!');
            }

            DB.saveJobs(jobs);
            closeJobFormModal();

            // Refresh views
            renderJobList();
            renderDashboard();
        }
    });

    // Sync applicant tables jobTitle property if parent Job details are edited
    function updateApplicantJobTitles(jobId, newTitle) {
        let appList = DB.getApplicants();
        appList = appList.map(app => {
            if (app.jobId === jobId) {
                return { ...app, jobTitle: newTitle };
            }
            return app;
        });
        DB.saveApplicants(appList);
        applicants = appList;
    }

    // ==========================================
    // 12. VIEW DETAILED JOB POPUP
    // ==========================================
    function showJobDetail(jobId) {
        const job = jobs.find(j => j.id === jobId);
        if (!job) return;

        el.detailJobTitle.textContent = job.title;
        el.detailJobLocation.textContent = job.location;
        el.detailJobSalary.textContent = formatSalary(job.salary);
        el.detailJobDate.textContent = formatDate(job.datePosted);
        el.detailJobDescription.textContent = job.description;
        el.detailJobRequirements.textContent = job.requirements;
        if (el.detailJobExperience) {
            el.detailJobExperience.textContent = job.experienceDescription || 'No experience description provided.';
        }

        // Badges update
        el.detailJobStatus.textContent = job.status;
        el.detailJobStatus.className = `badge ${job.status === 'Completed' ? 'badge-gray' : 'badge-success'}`;

        el.detailJobType.textContent = job.employmentType;

        el.modalJobDetailBackdrop.classList.add('show');
    }

    function closeJobDetailModal() {
        el.modalJobDetailBackdrop.classList.remove('show');
    }

    el.btnCloseDetailModal.addEventListener('click', closeJobDetailModal);
    el.btnCloseDetailModalFooter.addEventListener('click', closeJobDetailModal);

    // ==========================================
    // 13. DELETE JOB CONFIRM MODAL OVERLAY
    // ==========================================
    function openDeleteConfirmModal(jobId) {
        const targetJob = jobs.find(j => j.id === jobId);
        if (!targetJob) return;

        deleteJobId = jobId;
        el.deleteConfirmJobTitle.textContent = targetJob.title;
        el.modalDeleteConfirmBackdrop.classList.add('show');
    }

    function closeDeleteConfirmModal() {
        el.modalDeleteConfirmBackdrop.classList.remove('show');
        deleteJobId = null;
    }

    el.btnDeleteCancel.addEventListener('click', closeDeleteConfirmModal);

    el.btnDeleteConfirm.addEventListener('click', () => {
        if (deleteJobId) {
            // Filter out job
            jobs = jobs.filter(j => j.id !== deleteJobId);
            DB.saveJobs(jobs);

            // Clean/Cascade remove applicants for that job
            applicants = applicants.filter(a => a.jobId !== deleteJobId);
            DB.saveApplicants(applicants);

            showToast('Job listing deleted successfully.');
            closeDeleteConfirmModal();

            // Refresh views
            renderJobList();
            renderDashboard();
        }
    });

    // ==========================================
    // DYNAMIC WORK EXPERIENCE & EDUCATION HELPERS
    // ==========================================
    function setupFileInputHandler(fileInputId, fileNameDisplayId, storageCallback) {
        const input = document.getElementById(fileInputId);
        const display = document.getElementById(fileNameDisplayId);
        if (!input) return;

        input.addEventListener('change', function () {
            const file = input.files[0];
            if (!file) {
                if (display) {
                    display.textContent = 'No file selected';
                    display.style.color = 'var(--text-muted)';
                    display.style.fontWeight = 'normal';
                }
                storageCallback(null);
                return;
            }

            if (file.size > 3.5 * 1024 * 1024) {
                showToast('File size exceeds 3.5MB limit. Please select a smaller file.', 'error');
                input.value = '';
                if (display) {
                    display.textContent = 'File too large (>3.5MB)';
                    display.style.color = 'var(--danger)';
                }
                storageCallback(null);
                return;
            }

            const reader = new FileReader();
            reader.onload = function (e) {
                const fileObj = {
                    fileName: file.name,
                    fileType: file.type,
                    fileData: e.target.result
                };
                if (display) {
                    display.textContent = `Selected: ${file.name}`;
                    display.style.color = '#059669';
                    display.style.fontWeight = '600';
                }
                storageCallback(fileObj);
            };
            reader.onerror = function () {
                showToast('Error reading uploaded file.', 'error');
                storageCallback(null);
            };
            reader.readAsDataURL(file);
        });
    }

    setupFileInputHandler('register-resume-file', 'register-resume-filename', (f) => uploadedRegisterResume = f);
    setupFileInputHandler('register-diploma-file', 'register-diploma-filename', (f) => uploadedRegisterDiploma = f);
    setupFileInputHandler('my-resume-file', 'my-resume-filename', (f) => uploadedMyResume = f);
    setupFileInputHandler('my-diploma-file', 'my-diploma-filename', (f) => uploadedMyDiploma = f);

    const btnAddWorkExp = document.getElementById('btn-add-work-exp');
    if (btnAddWorkExp) {
        btnAddWorkExp.addEventListener('click', () => {
            createWorkExperienceRow(document.getElementById('register-work-exp-container'));
        });
    }

    const btnAddEdu = document.getElementById('btn-add-education');
    if (btnAddEdu) {
        btnAddEdu.addEventListener('click', () => {
            createEducationRow(document.getElementById('register-education-container'));
        });
    }

    const btnMyAddWorkExp = document.getElementById('btn-my-add-work-exp');
    if (btnMyAddWorkExp) {
        btnMyAddWorkExp.addEventListener('click', () => {
            createWorkExperienceRow(document.getElementById('my-work-exp-container'));
        });
    }

    const btnMyAddEdu = document.getElementById('btn-my-add-education');
    if (btnMyAddEdu) {
        btnMyAddEdu.addEventListener('click', () => {
            createEducationRow(document.getElementById('my-education-container'));
        });
    }

    function createWorkExperienceRow(container, data = null) {
        if (!container) return;

        const card = document.createElement('div');
        card.className = 'dynamic-item-card work-exp-item';

        const compName = data ? (data.companyName || '') : '';
        const jobPos = data ? (data.jobPosition || '') : '';
        const sDate = data ? (data.startDate || '') : '';
        const eDate = data ? (data.endDate || '') : '';
        const currWorking = data ? Boolean(data.currentlyWorking || eDate === 'Present') : false;
        const desc = data ? (data.description || '') : '';

        card.innerHTML = `
            <div class="dynamic-item-header">
                <h5>Work Experience Record</h5>
                <button type="button" class="btn-remove-item">
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="3 6 5 6 21 6"></polyline><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path></svg>
                    Remove
                </button>
            </div>
            <div class="form-row">
                <div class="form-group">
                    <label>Company Name</label>
                    <input type="text" class="input-field work-company" placeholder="e.g. Acme Inc." value="${escapeHTML(compName)}">
                </div>
                <div class="form-group">
                    <label>Job Position</label>
                    <input type="text" class="input-field work-position" placeholder="e.g. Software Engineer" value="${escapeHTML(jobPos)}">
                </div>
            </div>
            <div class="form-row">
                <div class="form-group">
                    <label>Start Date</label>
                    <input type="date" class="input-field work-start" value="${sDate}">
                </div>
                <div class="form-group">
                    <label>End Date</label>
                    <input type="date" class="input-field work-end" value="${currWorking ? '' : eDate}" ${currWorking ? 'disabled' : ''}>
                    <label style="font-size: 0.8rem; font-weight: 500; margin-top: 0.35rem; display: flex; align-items: center; gap: 0.35rem; cursor: pointer;">
                        <input type="checkbox" class="work-current" ${currWorking ? 'checked' : ''}> Currently Working Here
                    </label>
                </div>
            </div>
            <div class="form-group">
                <label>Description / Responsibilities</label>
                <textarea class="input-field work-desc" rows="2" placeholder="Key responsibilities and achievements..." style="resize: vertical; min-height: 60px;">${escapeHTML(desc)}</textarea>
            </div>
        `;

        const currCheckbox = card.querySelector('.work-current');
        const endDateInput = card.querySelector('.work-end');

        currCheckbox.addEventListener('change', function () {
            if (this.checked) {
                endDateInput.value = '';
                endDateInput.disabled = true;
            } else {
                endDateInput.disabled = false;
            }
        });

        const removeBtn = card.querySelector('.btn-remove-item');
        removeBtn.addEventListener('click', function () {
            card.remove();
        });

        container.appendChild(card);
    }

    function createEducationRow(container, data = null) {
        if (!container) return;

        const card = document.createElement('div');
        card.className = 'dynamic-item-card edu-item';

        const eduLevel = data ? (data.educationLevel || 'Bachelor\'s Degree') : 'Bachelor\'s Degree';
        const degree = data ? (data.degree || '') : '';
        const school = data ? (data.school || '') : '';
        const gradYear = data ? (data.graduationYear || '') : '';

        const levels = [
            "Senior High School",
            "College",
            "Bachelor's Degree",
            "Master's Degree",
            "Doctorate",
            "Vocational / Technical",
            "Other"
        ];

        const levelOptionsHTML = levels.map(lvl =>
            `<option value="${escapeHTML(lvl)}" ${lvl === eduLevel ? 'selected' : ''}>${escapeHTML(lvl)}</option>`
        ).join('');

        card.innerHTML = `
            <div class="dynamic-item-header">
                <h5>Education Record</h5>
                <button type="button" class="btn-remove-item">
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="3 6 5 6 21 6"></polyline><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path></svg>
                    Remove
                </button>
            </div>
            <div class="form-row">
                <div class="form-group">
                    <label>Education Level</label>
                    <select class="input-field edu-level">
                        ${levelOptionsHTML}
                    </select>
                </div>
                <div class="form-group">
                    <label>Degree / Course</label>
                    <input type="text" class="input-field edu-degree" placeholder="e.g. BS Computer Science" value="${escapeHTML(degree)}">
                </div>
            </div>
            <div class="form-row">
                <div class="form-group">
                    <label>School / University</label>
                    <input type="text" class="input-field edu-school" placeholder="e.g. University of the Philippines" value="${escapeHTML(school)}">
                </div>
                <div class="form-group">
                    <label>Graduation Year</label>
                    <input type="number" class="input-field edu-year" placeholder="e.g. 2022" min="1950" max="2035" value="${escapeHTML(gradYear)}">
                </div>
            </div>
        `;

        const removeBtn = card.querySelector('.btn-remove-item');
        removeBtn.addEventListener('click', function () {
            card.remove();
        });

        container.appendChild(card);
    }

    function getWorkExperienceFromContainer(container) {
        if (!container) return [];
        const items = container.querySelectorAll('.work-exp-item');
        const result = [];
        items.forEach(item => {
            const companyName = item.querySelector('.work-company').value.trim();
            const jobPosition = item.querySelector('.work-position').value.trim();
            const startDate = item.querySelector('.work-start').value;
            const currentlyWorking = item.querySelector('.work-current').checked;
            const endDate = currentlyWorking ? 'Present' : item.querySelector('.work-end').value;
            const description = item.querySelector('.work-desc').value.trim();

            if (companyName || jobPosition) {
                result.push({
                    companyName,
                    jobPosition,
                    startDate,
                    endDate,
                    currentlyWorking,
                    description
                });
            }
        });
        return result;
    }

    function getEducationFromContainer(container) {
        if (!container) return [];
        const items = container.querySelectorAll('.edu-item');
        const result = [];
        items.forEach(item => {
            const educationLevel = item.querySelector('.edu-level').value;
            const degree = item.querySelector('.edu-degree').value.trim();
            const school = item.querySelector('.edu-school').value.trim();
            const graduationYear = item.querySelector('.edu-year').value.trim();

            if (degree || school) {
                result.push({
                    educationLevel,
                    degree,
                    school,
                    graduationYear
                });
            }
        });
        return result;
    }

    // ==========================================
    // 14. APPLICANTS VIEW & INTERACTIVE CONTROLS
    // ==========================================
    function renderApplicants() {
        applicants = DB.getApplicants();
        jobs = DB.getJobs();

        const query = el.applicantSearchInput.value.toLowerCase().trim();
        const filterJobId = el.filterApplicantJob.value;

        // Populate job options filter dropdown dynamically
        populateApplicantJobFilterDropdown(filterJobId);

        // Apply filters
        const filteredApplicants = applicants.filter(app => {
            const matchQuery = app.name.toLowerCase().includes(query);
            const matchJob = filterJobId === 'all' || app.jobId === filterJobId;
            return matchQuery && matchJob;
        });

        if (filteredApplicants.length === 0) {
            el.applicantsList.innerHTML = `
        <tr>
          <td colspan="5" style="text-align: center; color: var(--text-muted); padding: 3rem;">
            <div class="empty-state" style="border: none; background: transparent;">
              <div class="empty-state-icon">
                <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path><circle cx="9" cy="7" r="4"></circle></svg>
              </div>
              <h4>No Applicants Found</h4>
              <p>No candidates match your filters. Post more listings or change filter options.</p>
            </div>
          </td>
        </tr>
      `;
            return;
        }

        el.applicantsList.innerHTML = filteredApplicants.map(app => {
            // Dynamic select styles based on state
            let selectClass = 'pending';
            if (app.status === 'Accepted') selectClass = 'accepted';
            if (app.status === 'Rejected') selectClass = 'rejected';

            return `
        <tr>
          <td style="font-weight: 600;">
            <div style="display: flex; flex-direction: column;">
              <span>${escapeHTML(app.name)}</span>
              <span style="font-size: 0.75rem; font-weight: 400; color: var(--text-muted); margin-top: 0.15rem;">
                ${escapeHTML(app.email)}
              </span>
            </div>
          </td>
          <td>${escapeHTML(app.jobTitle)}</td>
          <td>${formatDate(app.dateApplied)}</td>
          <td>
            <button class="btn btn-secondary btn-sm btn-view-applicant-resume" data-email="${escapeHTML(app.email)}" data-id="${app.id}" style="padding: 0.35rem 0.75rem; font-size: 0.8rem; display: inline-flex; align-items: center; gap: 0.35rem;">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path><polyline points="14 2 14 8 20 8"></polyline><line x1="16" y1="13" x2="8" y2="13"></line><line x1="16" y1="17" x2="8" y2="17"></line></svg>
              View Resume
            </button>
          </td>
          <td>
            <div class="status-select-wrapper">
              <select class="status-select ${selectClass}" data-id="${app.id}" aria-label="Change candidate status">
                <option value="Pending" ${app.status === 'Pending' ? 'selected' : ''}>Pending</option>
                <option value="Accepted" ${app.status === 'Accepted' ? 'selected' : ''}>Accepted</option>
                <option value="Rejected" ${app.status === 'Rejected' ? 'selected' : ''}>Rejected</option>
              </select>
            </div>
          </td>
        </tr>
      `;
        }).join('');

        // Attach listeners on candidate status change selects & View Resume buttons
        document.querySelectorAll('.status-select').forEach(select => {
            select.addEventListener('change', (e) => {
                const id = select.getAttribute('data-id');
                const newStatus = e.target.value;
                updateApplicantStatus(id, newStatus);
            });
        });

        document.querySelectorAll('.btn-view-applicant-resume').forEach(btn => {
            btn.addEventListener('click', () => {
                const email = btn.getAttribute('data-email');
                const id = btn.getAttribute('data-id');
                openApplicantProfileModal(email || id);
            });
        });
    }

    function populateApplicantJobFilterDropdown(selectedValue) {
        const listJobs = DB.getJobs();

        // Clear list but save first
        el.filterApplicantJob.innerHTML = '<option value="all">All Positions</option>';

        listJobs.forEach(job => {
            const option = document.createElement('option');
            option.value = job.id;
            option.textContent = job.title;
            if (job.id === selectedValue) {
                option.selected = true;
            }
            el.filterApplicantJob.appendChild(option);
        });
    }

    function updateApplicantStatus(applicantId, status) {
        applicants = DB.getApplicants();
        applicants = applicants.map(app => {
            if (app.id === applicantId) {
                return { ...app, status: status };
            }
            return app;
        });

        DB.saveApplicants(applicants);
        showToast(`Status changed to ${status}`);

        // Render and sync metrics
        renderApplicants();
        renderDashboard();
    }

    // Real-time applicant search & filters
    el.applicantSearchInput.addEventListener('input', renderApplicants);
    el.filterApplicantJob.addEventListener('change', renderApplicants);

    // ==========================================
    // 15. APPLICANT RESUME / PROFILE MODAL & MY RESUME VIEW
    // ==========================================
    function openApplicantProfileModal(applicantOrEmail) {
        let account = null;
        let applicantRecord = null;

        const accounts = DB.getApplicantAccounts();
        const allApplicants = DB.getApplicants();

        if (typeof applicantOrEmail === 'string') {
            account = accounts.find(a => a.email.toLowerCase() === applicantOrEmail.toLowerCase() || a.id === applicantOrEmail);
            applicantRecord = allApplicants.find(a => a.email.toLowerCase() === applicantOrEmail.toLowerCase() || a.id === applicantOrEmail);
        } else if (applicantOrEmail && typeof applicantOrEmail === 'object') {
            applicantRecord = applicantOrEmail;
            account = accounts.find(a => a.email.toLowerCase() === applicantRecord.email.toLowerCase());
        }

        const modalBackdrop = document.getElementById('modal-applicant-profile-backdrop');
        const modalName = document.getElementById('modal-applicant-name');
        const modalJob = document.getElementById('modal-applicant-job');
        const modalBody = document.getElementById('applicant-modal-body');

        if (!modalBackdrop || !modalBody) return;

        const fullName = (account ? account.fullName : null) || (applicantRecord ? applicantRecord.name : 'Applicant');
        const jobTitle = (applicantRecord ? applicantRecord.jobTitle : '') || 'Job Position';
        const email = (account ? account.email : null) || (applicantRecord ? applicantRecord.email : 'N/A');
        const phone = (account ? account.contactNumber : '') || 'N/A';
        const address = (account ? account.address : '') || 'Not provided';
        const dob = (account && account.dateOfBirth) ? formatDate(account.dateOfBirth) : 'Not provided';
        const summary = (account ? account.professionalSummary : '') || 'No professional summary provided.';
        const yearsExp = account ? (account.yearsOfExperience || 0) : 0;
        const workExps = account ? (account.workExperience || []) : [];
        const eduList = account ? (account.education || []) : [];
        const resumeFile = account ? account.resumeFile : null;
        const diplomaFile = account ? account.diplomaFile : null;

        modalName.textContent = fullName;
        modalJob.textContent = `Applied Position: ${jobTitle}`;

        let workHTML = '';
        if (workExps.length === 0) {
            workHTML = `<p style="font-size: 0.85rem; color: var(--text-muted);">No work experience listed.</p>`;
        } else {
            workHTML = workExps.map(w => `
                <div class="resume-item-card">
                    <div class="resume-item-title">${escapeHTML(w.jobPosition || 'Position')}</div>
                    <div class="resume-item-subtitle">${escapeHTML(w.companyName || 'Company')} • ${w.startDate ? formatDate(w.startDate) : ''} - ${w.currentlyWorking ? 'Present' : (w.endDate ? formatDate(w.endDate) : 'Present')}</div>
                    ${w.description ? `<div class="resume-item-desc">${escapeHTML(w.description)}</div>` : ''}
                </div>
            `).join('');
        }

        let eduHTML = '';
        if (eduList.length === 0) {
            eduHTML = `<p style="font-size: 0.85rem; color: var(--text-muted);">No education background listed.</p>`;
        } else {
            eduHTML = eduList.map(e => `
                <div class="resume-item-card" style="border-left-color: var(--primary);">
                    <div class="resume-item-title">${escapeHTML(e.degree || 'Degree / Course')} (${escapeHTML(e.educationLevel || 'Education')})</div>
                    <div class="resume-item-subtitle">${escapeHTML(e.school || 'School / University')} ${e.graduationYear ? '• Graduated ' + escapeHTML(e.graduationYear) : ''}</div>
                </div>
            `).join('');
        }

        let docHTML = '';
        const hasResume = Boolean(resumeFile && resumeFile.fileData);
        const hasDiploma = Boolean(diplomaFile && diplomaFile.fileData);

        if (!hasResume && !hasDiploma) {
            docHTML = `<p style="font-size: 0.85rem; color: var(--text-muted);">No documents uploaded.</p>`;
        } else {
            docHTML = `<div class="doc-btn-group">`;
            if (hasResume) {
                docHTML += `<button type="button" class="btn btn-secondary btn-sm btn-open-resume-doc" style="padding: 0.5rem 1rem;">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path><polyline points="14 2 14 8 20 8"></polyline></svg>
                    View Resume (${escapeHTML(resumeFile.fileName)})
                </button>`;
            }
            if (hasDiploma) {
                docHTML += `<button type="button" class="btn btn-secondary btn-sm btn-open-diploma-doc" style="padding: 0.5rem 1rem;">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="3" width="18" height="18" rx="2" ry="2"></rect><circle cx="8.5" cy="8.5" r="1.5"></circle><polyline points="21 15 16 10 5 21"></polyline></svg>
                    View Diploma / Certificate (${escapeHTML(diplomaFile.fileName)})
                </button>`;
            }
            docHTML += `</div>`;
        }

        modalBody.innerHTML = `
            <div class="resume-grid-info">
                <div class="resume-info-block">
                    <span class="resume-info-lbl">Email Address</span>
                    <span class="resume-info-val">${escapeHTML(email)}</span>
                </div>
                <div class="resume-info-block">
                    <span class="resume-info-lbl">Contact Number</span>
                    <span class="resume-info-val">${escapeHTML(phone)}</span>
                </div>
                <div class="resume-info-block">
                    <span class="resume-info-lbl">Years of Experience</span>
                    <span class="resume-info-val">${yearsExp} Year${yearsExp === 1 ? '' : 's'}</span>
                </div>
                <div class="resume-info-block">
                    <span class="resume-info-lbl">Date of Birth</span>
                    <span class="resume-info-val">${escapeHTML(dob)}</span>
                </div>
                <div class="resume-info-block" style="grid-column: 1 / -1;">
                    <span class="resume-info-lbl">Address</span>
                    <span class="resume-info-val">${escapeHTML(address)}</span>
                </div>
            </div>

            <div class="resume-section-title">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path><circle cx="12" cy="7" r="4"></circle></svg>
                Professional Summary
            </div>
            <p style="font-size: 0.9rem; line-height: 1.5; color: var(--text-main); background: #ffffff; padding: 0.85rem; border-radius: 8px; border: 1px solid var(--border);">${escapeHTML(summary)}</p>

            <div class="resume-section-title">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="2" y="7" width="20" height="14" rx="2" ry="2"></rect><path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16"></path></svg>
                Work Experience
            </div>
            ${workHTML}

            <div class="resume-section-title">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M22 10v6M2 10l10-5 10 5-10 5z"></path><path d="M6 12v5c3 3 9 3 12 0v-5"></path></svg>
                Educational Background
            </div>
            ${eduHTML}

            <div class="resume-section-title">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path><polyline points="14 2 14 8 20 8"></polyline></svg>
                Attached Documents
            </div>
            ${docHTML}
        `;

        const openResumeBtn = modalBody.querySelector('.btn-open-resume-doc');
        if (openResumeBtn && resumeFile) {
            openResumeBtn.addEventListener('click', function () {
                openDocumentFile(resumeFile);
            });
        }

        const openDiplomaBtn = modalBody.querySelector('.btn-open-diploma-doc');
        if (openDiplomaBtn && diplomaFile) {
            openDiplomaBtn.addEventListener('click', function () {
                openDocumentFile(diplomaFile);
            });
        }

        modalBackdrop.classList.add('show');
    }

    function closeApplicantProfileModal() {
        const modalBackdrop = document.getElementById('modal-applicant-profile-backdrop');
        if (modalBackdrop) modalBackdrop.classList.remove('show');
    }

    const btnCloseAppModal = document.getElementById('btn-close-applicant-modal');
    if (btnCloseAppModal) btnCloseAppModal.addEventListener('click', closeApplicantProfileModal);

    const btnCloseAppFooter = document.getElementById('btn-close-applicant-modal-footer');
    if (btnCloseAppFooter) btnCloseAppFooter.addEventListener('click', closeApplicantProfileModal);

    function openDocumentFile(fileObj) {
        if (!fileObj || !fileObj.fileData) {
            showToast('Document file is not available.', 'error');
            return;
        }
        try {
            const win = window.open();
            if (win) {
                if (fileObj.fileType && fileObj.fileType.includes('pdf')) {
                    win.document.write(`<iframe src="${fileObj.fileData}" style="width:100%; height:100vh; border:none;"></iframe>`);
                } else if (fileObj.fileType && fileObj.fileType.includes('image')) {
                    win.document.write(`<img src="${fileObj.fileData}" style="max-width:100%; height:auto; margin:20px auto; display:block;" />`);
                } else {
                    const a = document.createElement('a');
                    a.href = fileObj.fileData;
                    a.download = fileObj.fileName || 'document';
                    a.click();
                    win.close();
                }
            } else {
                const a = document.createElement('a');
                a.href = fileObj.fileData;
                a.download = fileObj.fileName || 'document';
                a.click();
            }
        } catch (e) {
            showToast('Unable to open file preview.', 'error');
        }
    }

    function renderMyResumeView() {
        if (!authState.isLoggedIn || authState.role !== 'applicant') return;

        const email = authState.currentUser;
        const accounts = DB.getApplicantAccounts();
        const account = accounts.find(a => a.email.toLowerCase() === email.toLowerCase());

        if (!account) return;

        const fullNameInput = document.getElementById('my-fullname');
        const emailInput = document.getElementById('my-email');
        const contactInput = document.getElementById('my-contact');
        const dobInput = document.getElementById('my-dob');
        const addressInput = document.getElementById('my-address');
        const summaryInput = document.getElementById('my-summary');
        const yearsExpInput = document.getElementById('my-years-experience');

        if (fullNameInput) fullNameInput.value = account.fullName || '';
        if (emailInput) emailInput.value = account.email || '';
        if (contactInput) contactInput.value = account.contactNumber || '';
        if (dobInput) dobInput.value = account.dateOfBirth || '';
        if (addressInput) addressInput.value = account.address || '';
        if (summaryInput) summaryInput.value = account.professionalSummary || '';
        if (yearsExpInput) yearsExpInput.value = account.yearsOfExperience || 0;

        const workContainer = document.getElementById('my-work-exp-container');
        if (workContainer) {
            workContainer.innerHTML = '';
            const workExps = account.workExperience || [];
            workExps.forEach(w => createWorkExperienceRow(workContainer, w));
        }

        const eduContainer = document.getElementById('my-education-container');
        if (eduContainer) {
            eduContainer.innerHTML = '';
            const edus = account.education || [];
            edus.forEach(e => createEducationRow(eduContainer, e));
        }

        const resumeIndicator = document.getElementById('my-resume-filename');
        const viewResumeBtn = document.getElementById('btn-my-view-resume');
        if (account.resumeFile) {
            if (resumeIndicator) {
                resumeIndicator.textContent = `Current: ${account.resumeFile.fileName}`;
                resumeIndicator.style.color = '#059669';
            }
            if (viewResumeBtn) {
                viewResumeBtn.style.display = 'inline-flex';
                viewResumeBtn.onclick = () => openDocumentFile(account.resumeFile);
            }
        } else {
            if (resumeIndicator) {
                resumeIndicator.textContent = 'No resume uploaded';
                resumeIndicator.style.color = 'var(--text-muted)';
            }
            if (viewResumeBtn) viewResumeBtn.style.display = 'none';
        }

        const diplomaIndicator = document.getElementById('my-diploma-filename');
        const viewDiplomaBtn = document.getElementById('btn-my-view-diploma');
        if (account.diplomaFile) {
            if (diplomaIndicator) {
                diplomaIndicator.textContent = `Current: ${account.diplomaFile.fileName}`;
                diplomaIndicator.style.color = '#059669';
            }
            if (viewDiplomaBtn) {
                viewDiplomaBtn.style.display = 'inline-flex';
                viewDiplomaBtn.onclick = () => openDocumentFile(account.diplomaFile);
            }
        } else {
            if (diplomaIndicator) {
                diplomaIndicator.textContent = 'No diploma uploaded';
                diplomaIndicator.style.color = 'var(--text-muted)';
            }
            if (viewDiplomaBtn) viewDiplomaBtn.style.display = 'none';
        }
    }

    const myResumeForm = document.getElementById('my-resume-form');
    if (myResumeForm) {
        myResumeForm.addEventListener('submit', function (e) {
            e.preventDefault();

            if (!authState.isLoggedIn || authState.role !== 'applicant') return;

            const email = authState.currentUser;
            const accounts = DB.getApplicantAccounts();
            const accountIdx = accounts.findIndex(a => a.email.toLowerCase() === email.toLowerCase());

            if (accountIdx < 0) return;

            const fullName = document.getElementById('my-fullname').value.trim();
            const contactNumber = document.getElementById('my-contact').value.trim();
            const dateOfBirth = document.getElementById('my-dob').value;
            const address = document.getElementById('my-address').value.trim();
            const professionalSummary = document.getElementById('my-summary').value.trim();
            const yearsOfExperience = parseInt(document.getElementById('my-years-experience').value) || 0;

            const workExperience = getWorkExperienceFromContainer(document.getElementById('my-work-exp-container'));
            const education = getEducationFromContainer(document.getElementById('my-education-container'));

            accounts[accountIdx] = {
                ...accounts[accountIdx],
                fullName,
                contactNumber,
                dateOfBirth,
                address,
                professionalSummary,
                yearsOfExperience,
                workExperience,
                education,
                resumeFile: uploadedMyResume || accounts[accountIdx].resumeFile,
                diplomaFile: uploadedMyDiploma || accounts[accountIdx].diplomaFile
            };

            DB.saveApplicantAccounts(accounts);

            // Sync applicant record name if changed
            let allApplicants = DB.getApplicants();
            allApplicants = allApplicants.map(a => {
                if (a.email.toLowerCase() === email.toLowerCase()) {
                    return { ...a, name: fullName };
                }
                return a;
            });
            DB.saveApplicants(allApplicants);

            authState.name = fullName;
            DB.saveAuth(authState);
            updateBizHeaderInfo();

            showToast('Your resume and profile have been updated!');
            renderMyResumeView();
        });
    }

    // ==========================================
    // 16. INITIALIZATION
    // ==========================================
    function init() {
        checkAuthentication();
    }

    // Run on page load
    init();

})();

