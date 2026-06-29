# Wobb Influencer Search

A redesigned influencer discovery application built for the Wobb Vibe Coder Intern assignment.

## Live Demo
https://aadigs.github.io/wobb-influencer-search/

## Setup
```bash
npm install
npm run dev
```

## What Changed

### Bugs Fixed
- Engagement rate was multiplying by 10000 instead of 100 (showing 1255% instead of 1.26%)
- Username search was case-sensitive (searching "CRISTIANO" returned nothing)
- Stale closure in click counter (removed - it was dead code)
- ProfileCard had a hardcoded w-[700px] class breaking all responsive layouts
- DOM used as state storage via data-search attribute (removed)
- react-beautiful-dnd was listed as a dependency but never imported
- Missing alt attributes on all img tags
- "Engagements" stat on profile page showed the rate percentage instead of the count

### Libraries Added
- **zustand** - State management for the shortlist, replacing what would have been React Context
- **lucide-react** - Icon library
- **framer-motion** - Drawer animation

### Features Implemented
**Add to List / Shortlist:**
- Add button on every ProfileCard and on the ProfileDetail page
- Duplicate prevention (button shows "Added" if already shortlisted)
- Persists across page refresh via localStorage (zustand persist middleware)
- Floating action button (bottom-right) with item count badge
- Slide-up animated drawer showing all shortlisted creators
- Remove individual creators or clear all
- Clicking a creator name in the drawer navigates to their profile

**UI Redesign:**
- Matches Wobb's own product design: dark navy header, blue primary (#2563EB), clean table layout
- Responsive layout (removed all hardcoded pixel widths)
- Proper stats grid on profile detail page
- Platform-specific color badges

### Assumptions
- Single global shortlist (not named campaign lists)
- 30 profiles across 3 platforms are demo data

### Trade-offs
- No tests added due to time constraints - would add vitest + testing-library next
- Framer Motion adds ~30KB gzipped; acceptable for animation quality
- No pagination added - the 10-profile dataset per platform doesn't require it

### Remaining Improvements
- Sort by followers / engagement rate
- Filter by follower count range
- Full ARIA/keyboard navigation compliance
- Write unit tests for utility functions and store
