const asyncHandler = require('express-async-handler')
const Goal = require('../models/goalModel')
const User = require('../models/userModel')

// @des     GET goals
// @route   Get /api/goals/
// @access  Private
const getGoals = asyncHandler(async (req, res) => {
    const goals = await Goal.find({ user: req.user.id })
    res.status(200).json(goals)
})

// @des     Set goal
// @route   POST /api/goals/
// @access  Private
const setGoal = asyncHandler(async (req, res) => {

    if (!req.body.text) {
        res.status(400)
        throw new Error('please add a text field')
    }

    const goal = await Goal.create({
        text: req.body.text,
        user: req.user.id,
    })

    res.status(200).json(goal)

})

// @des     Update goal
// @route   PUT /api/goals/:id
// @access  Private
const updateGoal = asyncHandler(async (req, res) => {
    const goal = await Goal.findById(req.params.id)

    if (!goal) {
        res.status(400)
        throw new Error('goal not found')
    }

    // find user by ID
    const user = await User.findById(req.user.id)

    // check if user don't exists
    if (!user) {
        res.status(401)
        throw new Error('User not found')
    }

    // check if the goal relates to this user
    if (goal.user.toString() !== user.id) {
        res.status(401)
        throw new Error('User not authorized')
    }

    const updatedGoal = await Goal.findByIdAndUpdate(req.params.id, req.body, { new: true, })

    res.status(200).json(updatedGoal)
})

// @des     Delete goal
// @route   DELETE /api/goals/:id
// @access  Private
const deleteGoal = asyncHandler(async (req, res) => {
    const goal = await Goal.findById(req.params.id)

    if (!goal) {
        res.status(400)
        throw new Error('goal not found')
    }

    // find user by ID
    const user = await User.findById(req.user.id)

    // check if user don't exists
    if (!user) {
        res.status(401)
        throw new Error('User not found')
    }

    // check if the goal relates to this user
    if (goal.user.toString() !== user.id) {
        res.status(401)
        throw new Error('User not authorized')
    }

    await goal.remove()

    res.status(200).json({
        message: 'goal deleted'
    })
})

module.exports = {
    getGoals, setGoal, updateGoal, deleteGoal
}