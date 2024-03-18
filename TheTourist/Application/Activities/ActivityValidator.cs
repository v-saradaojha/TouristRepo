using Domain;
using FluentValidation;

namespace Application.Activities
{
    public class ActivityValidator : AbstractValidator<Activity>
    {
        public ActivityValidator()
        {
            RuleFor(m => m.Title).NotEmpty();
            RuleFor(m => m.Description).NotEmpty();
            RuleFor(m => m.Date).NotEmpty();
            RuleFor(m => m.Category).NotEmpty();
            RuleFor(m => m.City).NotEmpty();
            RuleFor(m => m.Venue).NotEmpty();
        }
    }
}