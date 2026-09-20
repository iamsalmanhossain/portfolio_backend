$commits = @(
    @{ Files = "prisma/achievement.prisma"; Message = "chore: format achievement prisma schema"; Date = "2026-09-20T00:15:00+06:00" },
    @{ Files = "prisma/adminPortfolio.prisma"; Message = "chore: format adminPortfolio prisma schema"; Date = "2026-09-20T00:35:00+06:00" },
    @{ Files = "prisma/blog.prisma"; Message = "chore: format blog prisma schema"; Date = "2026-09-20T00:55:00+06:00" },
    @{ Files = "prisma/certificate.prisma"; Message = "chore: format certificate prisma schema"; Date = "2026-09-20T01:20:00+06:00" },
    @{ Files = "prisma/contactMessage.prisma"; Message = "chore: format contactMessage prisma schema"; Date = "2026-09-20T01:45:00+06:00" },
    @{ Files = "prisma/education.prisma"; Message = "chore: format education prisma schema"; Date = "2026-09-20T02:10:00+06:00" },
    @{ Files = "prisma/experience.prisma"; Message = "chore: format experience prisma schema"; Date = "2026-09-20T02:30:00+06:00" },
    @{ Files = "prisma/project.prisma prisma/projectCategory.prisma prisma/projectView.prisma"; Message = "chore: format project related prisma schemas"; Date = "2026-09-20T02:50:00+06:00" },
    @{ Files = "prisma/githubStats.prisma prisma/hero.prisma prisma/seoSetting.prisma"; Message = "chore: format github, hero and seo setting schemas"; Date = "2026-09-20T03:15:00+06:00" },
    @{ Files = "prisma/service.prisma prisma/session.prisma prisma/skills.prisma"; Message = "chore: format service, session and skills schemas"; Date = "2026-09-20T03:40:00+06:00" },
    @{ Files = "prisma/socialLink.prisma prisma/testimonial.prisma prisma/user.prisma prisma/visitorAnalytics.prisma"; Message = "chore: format remaining prisma schemas"; Date = "2026-09-20T04:00:00+06:00" },
    @{ Files = "src/modules/contact/contact.service.ts"; Message = "feat: update contact service logic"; Date = "2026-09-20T04:20:00+06:00" },
    @{ Files = "src/modules/contact/contact.controller.ts src/modules/contact/contact.route.ts"; Message = "feat: update contact controller and routes"; Date = "2026-09-20T04:45:00+06:00" },
    @{ Files = "src/middleware/rateLimiter.ts"; Message = "chore: update rate limiter configuration"; Date = "2026-09-20T05:05:00+06:00" },
    @{ Files = "src/modules/visitorAnalytics/ src/app/routes/index.ts"; Message = "feat: implement visitor analytics API endpoints"; Date = "2026-09-20T05:25:00+06:00" }
)

foreach ($commit in $commits) {
    $files = $commit.Files -split " "
    foreach ($f in $files) {
        git add $f
    }
    
    $date = $commit.Date
    $env:GIT_COMMITTER_DATE = $date
    $env:GIT_AUTHOR_DATE = $date
    
    git commit -m "$($commit.Message)" --date="$date"
    # Delay purely for realism if needed, but not strictly necessary for git history
    git push
}
