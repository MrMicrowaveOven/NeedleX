# Needle-X

A map of Needle Exchange locations in the bay area (and soon to be other areas).

## WorkFlow Guidelines

1. Everything is a PR.  Please don't push to master.  It makes it hard to track who did what when.
2. At least 75% of the Engineers (rounded up) must approve a PR.  This is so everyone maintains knowledge of the codebase, and any new features that are added.  A simple "LGTM" comment is considered approval.
3. Please log changes via a Trello ticket.  If you'd like to add a feature, make it a Trello ticket first.  This will make it easier for Non-Engineers to know when a new feature has been rolled out.
4. Code review is good!  Please take criticism well.  On that same note, don't be afraid to be say something if something could be done a better way.

So let's go change some lives people!

## Getting started

### Setting your local environment

Clone the repo locally, email Malekai@Zagorski.com (or slack him) for the environment variables.

To clone the local database, running an update on http://localhost:3000/locations/1/edit will pull the current database from the spreadsheet.

And that's it!  Let me know if you have any questions.

## Changing the list of services

As of now, it requires an Engineer to change the list of services a location can have.  Here's the process to doing so.

Edit the SERVICES constant on index.html to match columns starting at AA on the spreadsheet.
Edit the number on the locations_controller#create so that the correct number of columns are gathered.
