const asyncHandler = require('express-async-handler')
const Goal = require('../models/goalModel')

// @des     GET goals
// @route   Get /api/goals/
// @access  Private
const getGoals = asyncHandler(async (req, res) => {
    const goals = await Goal.find()
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

    const updatedGoal = await Goal.findByIdAndUpdate(req.params.id, req.body, { new: true, })

    res.status(200).json(updatedGoal)
})

// @des     Delete goal
// @route   DELETE /api/goals/:id
// @access  Private
const deleteGoal = asyncHandler(async (req, res) => {
    const goal = await Goal.findById(req.params.id)
    console.log(goal)

    if (!goal) {
        res.status(400)
        throw new Error('goal not found')
    }

    await goal.remove()

    res.status(200).json({
        message: 'goal deleted'
    })
})

module.exports = {
    getGoals, setGoal, updateGoal, deleteGoal
}