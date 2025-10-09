document.addEventListener('DOMContentLoaded', function() {
    const navLinks = document.querySelectorAll('.sidebar-nav a');
    const contentSections = document.querySelectorAll('.content-section');

    // Mock data for demonstration
    const mockUsers = [
        { name: 'John Doe', email: 'john.doe@example.com', plan: 'Premium', status: 'Active' },
        { name: 'Jane Smith', email: 'jane.smith@example.com', plan: 'Basic', status: 'Active' },
        { name: 'Peter Jones', email: 'peter.jones@example.com', plan: 'Premium', status: 'Cancelled' },
        { name: 'Mary Johnson', email: 'mary.johnson@example.com', plan: 'Team', status: 'Active' },
    ];

    function showSection(targetId) {
        contentSections.forEach(section => {
            section.style.display = section.id === targetId ? 'block' : 'none';
        });
    }

    navLinks.forEach(link => {
        link.addEventListener('click', function(event) {
            event.preventDefault();
            const targetId = this.getAttribute('href').substring(1);

            if (targetId === 'logout') {
                // Handle logout functionality
                alert('Logged out successfully!');
                return;
            }

            navLinks.forEach(navLink => navLink.classList.remove('active'));
            this.classList.add('active');
            showSection(targetId);
        });
    });

    function populateDashboard() {
        document.getElementById('total-users').textContent = mockUsers.length;
        const activeSubscriptions = mockUsers.filter(user => user.status === 'Active').length;
        document.getElementById('active-subscriptions').textContent = activeSubscriptions;

        const userTable = document.getElementById('userTable');
        userTable.innerHTML = ''; // Clear existing rows
        mockUsers.forEach(user => {
            const row = document.createElement('tr');
            row.innerHTML = `
                <td>${user.name}</td>
                <td>${user.email}</td>
                <td>${user.plan}</td>
                <td>${user.status}</td>
            `;
            userTable.appendChild(row);
        });
    }

    // Initial setup
    showSection('dashboard');
    populateDashboard();
});
