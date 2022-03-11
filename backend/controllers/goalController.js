const asyncHandler = require('express-async-handler')

// @des     GET goals
// @route   Get /api/goals/
// @access  Private
const getGoals = asyncHandler(async (req, res) => {
    res.json({
        message: 'get goals from controller'
    })
})

// @des     Set goal
// @route   POST /api/goals/
// @access  Private
const setGoal = asyncHandler(async (req, res) => {
    if (!req.body.text) {
        res.status(400)
        throw new Error('please add a text field')
    }
    res.json({
        message: 'set goal from controller'
    })
})

// @des     Update goal
// @route   PUT /api/goals/:id
// @access  Private
const updateGoal = asyncHandler(async (req, res) => {
    res.json({
        message: 'update goal from controller'
    })
})

// @des     Delete goal
// @route   DELETE /api/goals/:id
// @access  Private
const deleteGoal = asyncHandler(async (req, res) => {
    res.json({
        message: 'delete goal from controller'
    })
})

module.exports = {
    getGoals, setGoal, updateGoal, deleteGoal
}