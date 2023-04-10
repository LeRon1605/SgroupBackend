class UserController {
    constructor() {
        this.users = [
            {
                "id": 1,
                "fullname": "Nguyen Huy Tuong",
                "gender": true,
                "age": 18
            },
            {
                "id": 2,
                "fullname": "Nguyen Thi Tuong",
                "gender": false,
                "age": 15
            }
        ];
    }

    getAllUser = (req, res, next) => {
        return res.status(200).json(this.users);
    }

    getUserById = (req, res, next) => {
        const user = this.users.find(x => x.id == req.params.id);
        if (user == null) {
            return res.status(404).json({ message: 'User does not exist.' });
        }
        return res.status(200).json(user);
    }

    createNewUser = (req, res, next) => {
        const newUser = {
            id: Number(this.users.at(-1)?.id || 0) + 1,
            fullname: req.body.fullname,
            gender: req.body.gender,
            age: req.body.age
        };
        this.users.push(newUser);
        return res.status(201).json(newUser);
    }

    updateUser = (req, res, next) => {
        const index = this.users.map(x => x.id).indexOf(Number(req.params.id));
        if (index == -1) {
            return res.status(404).json({ message: 'User does not exist.' });
        }

        this.users[index] = {
            id: this.users[index].id,
            fullname: req.body.fullname,
            gender: req.body.gender,
            age: req.body.age
        };

        return res.status(204).json();
    }

    removeUser = (req, res, next) => {
        const index = this.users.map(x => x.id).indexOf(Number(req.params.id));
        if (index == -1) {
            return res.status(404).json({ message: 'User does not exist.' });
        }

        this.users.splice(index, 1);
        return res.status(204).json();
    }
}

export default new UserController();