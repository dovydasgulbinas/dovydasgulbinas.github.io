---
layout: post
comments: true
title: Allow  Developers To Deploy Straight To Production
date: 2018-07-18 18:04:39
date_updated:
categories:
  - devops
  - rant
---

In times when _continous integration_ is a new fad there still exists legacy
systems which are not suitable for this flexible way of applying changes.  This
means that your company will be stuck in the eternal purgatory of developers and devops working
together on task that developer alone could of done.  Not allowing for your
developer to apply changes for himself is a **stupid methodology**.  


It hinders personal growth
--------------------------

- __potential__ mistakes of a developer are outsourced.
- less people are aware of how your system works.
- Bugs still happen
- Different Data Different Bugs

Learning is a process of making a mistake and learning from it.  True lessons
are learned when you have to think on your feet while being spammed with 10
emails per second about your feature,  that broke whole production .  And you know
what _"hot learning"_  is a nice thing.  Because your developer will be the person who will
fix the problem faster than anyone else, because he most likely formed an
intuition on parts that may break.  Do not outsource the most valuable learning
resource -- mistakes.  

If you compartmentalize duties of your organization like cheap Arduino modules
from eBay you actively create  an organization of people who are
overspecialized thus leading the whole company not having a holistic view on
their own system, because your employees are focused on one small part and not
whole project in general.  This means that if something goes wrong there will be
only one or two people who can fix something after a change has been deployed,
but what happens if those two _super employees_ are on a vacation? Some third
superman will most likely emerge **naturally** so why not allow everyone to be
**natural** from their first feature?  Fires are best handled in houses of firefighters. 

Bugs will are inevitable.  Furthermore different data yields different bugs.
This is more than true with _Enterprise Resourse Planning (ERP)_ systems.  From
my own experience and shared experiences of many other ERP developers most of
them seem to arrive to the same conclusions, clients manage to find bugs the
first & data creates bugs no matter how thorough you are at hunting them. This is normal, because 
systems with such complexity can't be (and shouldn't be) understood by a single developer.
So if developer deploys the code and some bugs emerge it will most likely be a bug that no
one even thought about.  Just get on with it, since you already trust a
developer to write a piece of code not trusting him to deploy it seems like more
dichotomy rather than a safety measure.


Cost per change is much higher
------------------------------

- It requires more people than needed
- It it creates unnecessary dependence on other people
- It complicates the whole procedure to due to lack of transparency.

Some big companies need whole departments just to release software, this in an
overkill. If you would look at majority of
operation departments you would most likely see some old, crusty and manual
deployment rituals that could be made more modern without "risking" the so
required system stability.  Locate parts in your system that require most manual work
and replace them with automation tools or frameworks like:  Jenkins, Ansible,
Puppet, Fabric, Kubernetes...

Additionally, if some other department (or a overspecialized employee) is doing your deployment it creates an
unpleasant dependency on other people no matter how streamlined your deployment
process is, there will to be cases where developer will have to contact the
operations and ask for them to do something _"not found in the recipe book"_,
this often creates long threads of emails and answers saying I am not
authorized to authorize you should ask authorization from your superior authority. **Long threads of emails!** 

Finally, organizational modularity increases complexity due to lack of cross
domain knowledge.  Operations know very little about programming, while
developer knows very little about deployment.  This makes communication for
these to parties hard from time to time, thus increasing complexity of deployment
process.


Changing something takes much longer
------------------------------------

- Releases
- Back and Forth Pushing
- Bureaucratic emails 

A clunky deployment ritual will lead to **releases**.  Releases depending on the
project will occur daily, weekly or even monthly.  This means that code
developer wrote
will be stuck in some sort of "abyss", where it is not used nor tested if it was a big
feature and release took one month and bugs were spotted in production, good look 
expecting that this bug will be fixed quickly, because it is very likely that dev
who wrote the code barely remembers what that feature and assumptions he had
during development of that feature.  This is supper unproductive.  Clunky
releases create another issue _it realeases many features made by many developers_ 
this means that if something breaks (after a release)  there will be name calling and finger
pointing because no one wants to fix bugs since they are not entirely sure it is
a bug they made.  To many many cooks spoil the broth. 

Okay, your "bug free" code has been peer reviewed all unit and function tests
passed testing department tested your feature and says it can be released, this
code gets released and BOOM critical bug in production emerges. Now the whole
release gets reverted and you as a developer have to squash that darn thing.  Just because a bug was
critical does not mean it can't be fixed in few minutes.
But since your organization adheres to the dogma of __releases__ you have to be put on hold
and be forced to wait a day, week, month until your patch will be deployed again.
This is also super unproductive, compared to developer deploying code on his own. By deploying code by yourself
you most likely would of fixed it and deployed it again almost instantly and if you saw it is a hard
case you  would make a final decision whether this feature should be
reverted or not.  If a person is capable of making decision on his own
don't outsource that to another department, because your company and the
developer will lose valuable time and energy.

Also, imagine a case where there let's say 3 uncaught bugs appear in the release.  This
means that in order to fix everything developer on worst case scenario would
have to wait 3 whole months just to fix 3 simple bugs he would of fixed quickly
on his own without relying on operations to deploy it.

If things go wrong someone will most likely be bombarded with emails.  Emails
from multiple people saying the same thing: "Feature X broke after most recent
release"  this only distracts everyone involved in the process, because someone has to
respond to these emails and if a developer is responding  then he is wasting his valuable
time rather than fixing a bug he made. This in turn lengthens the whole release
process.


Conclusion
==========

More individual responsibility for the developer yields greater individual
growth and more productive organization in general.  Allowing a developer to 
deploy his own code reduces number of employees needed to release software.
Developer will be significantly faster when fixing and releasing his code if he
is given an ability to deploy to production since bugs are inevitable.  

If you work in a company who has an old and stubborn  way of releasing software
begin by trying defuse the barrier between developers and operations, let them
talk and decide how to give more freedom & responsibility to person actually
writing the code.

return 0

