const User = require("../models/User");
const bcrypt = require("bcrypt");

class AuthController {
    // Trang đăng ký
    index(req, res) {
        res.render("register");
    }

    // Trang đăng nhập
    indexlogin(req, res) {
        res.render("login");
    }

    // Xử lý đăng ký người dùng
    async register(req, res) {
        try {
            const { fullName, dateOfBirth, country, province, district, address, email, phone, password, confirmPassword } = req.body;

            // Kiểm tra sự trùng lặp của email trước khi lưu
            const existingUser = await User.findOne({ email: email });
            if (existingUser) {
                return res.render("register", {
                    errorMessage: "Email đã được đăng ký.",
                    successMessage: "",
                });
            }

            // Kiểm tra mật khẩu nhập lại
            if (password !== confirmPassword) {
                return res.render("register", {
                    errorMessage: "Mật khẩu không khớp.",
                    successMessage: "",
                });
            }

            // Kiểm tra độ dài của mật khẩu
            if (password.length < 6) {
                return res.render("register", {
                    errorMessage: "Mật khẩu phải dài ít nhất 6 ký tự.",
                    successMessage: "",
                });
            }

            // Mã hóa mật khẩu
            const salt = await bcrypt.genSalt(10);
            const hashedPassword = await bcrypt.hash(password, salt);

            // Tạo người dùng mới
            const newUser = new User({
                fullName,
                dateOfBirth,
                country,
                province,
                district,
                address,
                email,
                phone,
                password: hashedPassword,
            });

            // Lưu người dùng mới vào cơ sở dữ liệu
            await newUser.save();

            // Gửi thông báo thành công
            res.render("register", {
                successMessage: "Đăng ký thành công!",
                errorMessage: "",
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
                return res.render("login", { errorMessage: "Email không tồn tại." });
            }

            // So sánh mật khẩu người dùng với mật khẩu đã mã hóa trong cơ sở dữ liệu
            const validPassword = await bcrypt.compare(password, user.password);
            if (!validPassword) {
                return res.render("login", { errorMessage: "Mật khẩu không chính xác." });
            }

            // Lưu thông tin người dùng vào session
            req.session.user = {
                id: user._id,
                fullName: user.fullName,
                email: user.email,
                phone: user.phone
            };

            req.session.successMessage = "Đăng nhập thành công! Chào mừng " + user.fullName;
            // Chuyển hướng đến trang thông tin người dùng
            return res.redirect("/user");
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
            res.redirect("/login"); // Chuyển hướng về trang đăng nhập
        });
    }

    // Trang hiển thị thông tin người dùng
    userProfile(req, res) {
        if (!req.session.user) {
            return res.redirect("/login");
        }

        const user = req.session.user;
        res.render("Profile", {
            user,
        });
    } 
    
    //check đăng nhập chưa
    async check(req, res) {
        try {
            if (req.session && req.session.user) {
                res.json({
                    loggedIn: true,
                    user: {
                        username: req.session.user.fullName,
                        email: req.session.user.email,
                        phoneNumber: req.session.user.phone,  
                        address: req.session.user.address           
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
