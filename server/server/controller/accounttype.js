import models from '../models';
import validator from 'validation';
const AccountType = models.AccountType;

export default {

    /**
     * Get all the account types
     * @param {Request} req 
     * @param {Response} res 
     */

    getAccountTypes(req, res) {
        return AccountType
        .findAll({
            where: {
                deleted: false
            }
        })
        .then(accounttype => res.status(201).send(accounttype))
        .catch(error => res.status(400).send(error));
    },

    /**
     * Add a new Account type
     * @param {Request} req 
     * @param {Response} res 
     */
    addAccountType(req, res){
        let name = req.body.name;
        let description = req.body.description;
        let level = req.body.level;

        if(validator.isEmpty(name+'')){
            res.status(400).send({
                success: false,
                message: 'Oops! Name cannot be empty'
            });
            return;
        }

        if(validator.isEmpty(description+'')){
            res.status(400).send({
                success: false,
                message: 'Oops! Description cannot be empty'
            });
            return;
        }

        if(validator.isEmpty(level+'')){
            res.status(400).send({
                success: false,
                message: 'Oops! Level cannot be empty'
            });
            return;
        }

        return AccountType
        .create({
            name: name,
            level: level,
            description: description,
            deleted: false,
        })
        .then(accounttype => {
            res.send({
                msg: 'Accounttype added successfully'
            });
        })
        .catch(error => res.status(400).send(error));
    },    
};