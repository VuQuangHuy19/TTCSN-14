const User = require("../models/User");
const bcrypt = require("bcrypt");

class AuthController {
    // Trang đăng ký
    index(req, res) {
        res.render('register');
    }

    // Trang đăng nhập
    indexlogin(req, res) {
        res.render('login');
    }

    // Xử lý đăng ký người dùng
    async register(req, res) {
        try {
            const { fullName, dateOfBirth, citizenID, passport, dateOfIssue, country, province, district, address, referralCode, email, password, confirmPassword } = req.body;

            // Kiểm tra sự trùng lặp của email trước khi lưu
            const existingUser = await User.findOne({ email: email });
            if (existingUser) {
                return res.render('register', {
                    errorMessage: "Email is already registered.",
                    successMessage: ''
                });
            }

            // Kiểm tra mật khẩu nhập lại
            if (password !== confirmPassword) {
                return res.render('register', {
                    errorMessage: "Passwords do not match.",
                    successMessage: ''
                });
            }

            // Kiểm tra độ dài của mật khẩu
            if (password.length < 6) {
                return res.render('register', {
                    errorMessage: "Password must be at least 6 characters long.",
                    successMessage: ''
                });
            }

            // Mã hóa mật khẩu
            const salt = await bcrypt.genSalt(10);
            const hashedPassword = await bcrypt.hash(password, salt);

            // Tạo người dùng mới
            const newUser = new User({
                fullName,
                dateOfBirth,
                citizenID,
                passport,
                dateOfIssue,
                country,
                province,
                district,
                address,
                referralCode,
                email,
                password: hashedPassword
            });

            // Lưu người dùng mới vào cơ sở dữ liệu
            await newUser.save();

            // Gửi thông báo thành công
            res.render('register', {
                successMessage: "You have registered successfully!",
                errorMessage: ''
            });

        } catch (err) {
            console.log(err);
            res.status(500).json({ message: "Server error", error: err });
        }
    }

    // Xử lý đăng nhập
    async login(req, res) {
        try {
            const { email, password } = req.body;

            // Tìm người dùng theo email
            const user = await User.findOne({ email: email });
            if (!user) {
                return res.render('login', { errorMessage: "Email does not exist" });
            }

            // So sánh mật khẩu người dùng với mật khẩu đã mã hóa trong cơ sở dữ liệu
            const validPassword = await bcrypt.compare(password, user.password);
            if (!validPassword) {
                return res.render('login', { errorMessage: "Incorrect password" });
            }

            // Lưu thông tin người dùng vào session
            req.session.user = {
                id: user._id,
                fullName: user.fullName,
                email: user.email,
            };

            // Chuyển hướng đến trang home
            return res.redirect('/');

        } catch (err) {
            console.error(err);
            res.status(500).json({ message: "Server error", error: err });
        }
    }

    // Route xử lý đăng xuất
    logout(req, res) {
        req.session.destroy((err) => {
            if (err) {
                console.error(err);
                return res.status(500).json({ message: "Logout failed" });
            }
            res.redirect('/login'); // Chuyển hướng về trang đăng nhập
        });
    }

    // Kiểm tra người dùng đã đăng nhập chưa
    async checkLoginStatus(req, res) {
        try {
            if (req.session && req.session.user) {
                res.json({
                    loggedIn: true,
                    user: {
                        fullName: req.session.user.fullName,
                        email: req.session.user.email,
                    },
                });
            } else {
                res.json({ loggedIn: false });
            }
        } catch (err) {
            console.error(err);
            res.status(500).json({ message: "Server error", error: err });
        }
    }
}

module.exports = new AuthController();
