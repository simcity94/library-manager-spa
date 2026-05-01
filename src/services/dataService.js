const USERS_KEY = 'users';

function getUsers() {
    const raw = localStorage.getItem('users');

    if (!raw) return [];

    const data = JSON.parse(raw);

    return Array.isArray(data) ? data : [];
}

function saveUsers(users) {
    localStorage.setItem('users', JSON.stringify(users));
}

export async function register(email, password) {
    const users = getUsers();

    if (users.find(u => u.email === email)) {
        throw new Error('User already exists');
    }

    const user = {
        _id: 'user-' + Date.now(),
        email,
        password
    };

    users.push(user);
    saveUsers(users);

    return {
        email: user.email,
        _id: user._id,
        accessToken: user._id 
    };
}

export async function login(email, password) {
    const users = getUsers();

    const user = users.find(u => u.email === email && u.password === password);

    if (!user) {
        throw new Error('Invalid credentials');
    }

    return {
        email: user.email,
        _id: user._id,
        accessToken: user._id
    };
}