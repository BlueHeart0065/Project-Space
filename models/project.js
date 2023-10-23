const mongoose = require('mongoose');
const Comment = require('./comment');

const Schema = mongoose.Schema;

const ProjectSchema = new Schema({
    title : {
        type : String,
        required : true,
    },
    description : {
        type : String,
        required : true
    },
    category : [{
        type : String,
        enum: [
            'Web Development',
            'Mobile App Development',
            'Software Development',
            'Game Development',
            'Data Analysis',
            'Machine Learning',
            'Artificial Intelligence',
            'Internet of Things (IoT)',
            'Robotics',
            'Embedded Systems',
            'Blockchain',
            'Cybersecurity',
            'Cloud Computing',
            'Digital Marketing',
            'E-commerce',
            'Content Management',
            'Graphic Design',
            'Multimedia',
            'Network Infrastructure',
            'Business Process Automation'
          ],
        required : true
    }],
    tags : [
        {
            type : String,
            enum: [
                'Project Management',
                'Team Collaboration',
                'Time Management',
                'Agile Methodology',
                'Problem Solving',
                'Innovation',
                'Research',
                'Planning',
                'Development Lifecycle',
                'Testing',
                'Quality Assurance',
                'Documentation',
                'Version Control',
                'Communication',
                'Debugging',
                'Troubleshooting',
                'Deployment',
                'Maintenance',
                'Scalability',
                'Performance Optimization',
                'Security Measures',
                'User Feedback',
                'User Testing',
                'Continuous Improvement',
                'Data Analysis',
                'Reporting',
                'Risk Assessment',
                'Budgeting',
                'Resource Allocation',
                'Stakeholder Management',
                'Client Relations',
                'Business Analysis',
                'Market Research',
                'Marketing Strategy',
                'Product Design',
                'User-Centric Approach',
                'Prototyping',
                'Cross-Platform Compatibility',
                'Integration',
                'User Authentication',
                'Data Privacy',
                'Compliance Standards',
                'User Training',
                'Customer Support',
                'User Engagement',
                'Performance Metrics',
                'Customer Satisfaction',
                'Success Metrics',
                'Feedback Loops',
                'Project Evaluation'
              ]
        }
    ],
    project_level : {
        type : String,
        enum : ['Beginner' , 'Intermediate' , 'Advanced' , 'Expert']
    },
    author : {
        type : Schema.Types.ObjectId , 
        ref : 'User'
    },
    contributors : [{
        type : String,
        default : 'none'
    }],
    date : {
        type : Date,
        default : Date.now
    },
    image : {
        type : String
    },
    comments : [{
        type : Schema.Types.ObjectId,
        ref : 'Comment'
    }]
});

const Project = mongoose.model('Project' , ProjectSchema);

ProjectSchema.post('findOneAndDelete' , async function(doc) {
    if(doc) {
        await Comment.deleteMany({
            _id : {$in : doc.comments}
        });
    }
})

module.exports = Project;

