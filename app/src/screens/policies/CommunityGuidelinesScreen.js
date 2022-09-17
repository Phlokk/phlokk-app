import { Text, StyleSheet, ScrollView, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import React from "react";

import colors from "../../../config/colors";
import PostNavBar from "../../components/general/navBar/NavBarGeneral";

export default function CommunityGuidelinesScreen() {
  return (
    <SafeAreaView style={styles.container}>
      <PostNavBar title="Community Guidelines" />
      <View style={styles.spacerTop}></View>

      <ScrollView style={styles.spacer}>
        <Text style={styles.middlePar}>
          We strive to make this a safe place for everyone with as much freedom
          as possible but to do that we must have rules to protect our users and
          our platform from liability.
        </Text>
        <Text style={styles.largeText}>Short Version</Text>
        <Text style={styles.middlePar}>
          Phlokk was built to be a safe place for all people that are 17 or
          older, regardless of race, creed, color, sexual orientation, beliefs,
          political views, physical features, social standing or life style
          choices. Phlokk is an all inclusive place for people to be themselves
          without fear of being degraded or bullied. Please read all of the
          guidelines to ensure you understand the rules of our platform, there
          are some exceptions. To keep your account in good standing is very
          easy, if you don’t like the content scroll past it or block the user,
          unless you truly feel the content needs to be reported, be kind to
          everyone you interact with, keep your gender parts covered, don’t post
          anything that is illegal, hurtful to another or anything that could
          cause harm to yourself or someone else. Do not post confidential
          information about other people. Basically be a good human being, treat
          others as you would like to be treated, kindness is free, sprinkle it
          everywhere.
        </Text>

        <Text style={styles.middlePar}>
          **The “infraction if” statement is not closed to the items listed
          under it, they are examples of what to not post or share on Phlokk’s
          platform, we reserve the right to determine if the content in any form
          is an infraction.
        </Text>
        <Text style={styles.largeText}>Minor Safety Guidelines: Section 1</Text>
        <Text style={styles.middlePar}>
          Protecting children is of our highest priority. This platform is meant
          for adults only but we know children will be in videos and pictures,
          their safety is the responsibility of parent, community and platform.
          If you see abuse of any kind please report it immediately. A minor is
          any person under the age of 18. All users including “watchers” must
          meet the minimum age requirements of 17 to hold an account of their
          own. When an underage account is found it is immediately deleted
          without warning. Account holders who are the age of 17 cannot send or
          receive gifts though our virtual gifting features until they turn 18.
          We prohibit anything that involves or glorifies the abuse, harm,
          endangerment, trafficking or exploitation of minors. Any content,
          including animation/cartoons, digitally created or
          manipulated/photoshopped media, that shows or glorifies abuse,
          exploitation, or endangerment of minors is a violation on Phlokk any
          offending content will be deleted from our platform as soon as it’s
          found. Any content found that is determined to be illegal or harmful
          to said minor will be turned over to the proper authorities in the
          offenders country or region. Age of consent in your country or region
          does not override the following rules. A minor safety infraction (all
          of section 1) could result in a permanent ban from Phlokk and possible
          criminal charges for the offender.
        </Text>
        <Text style={styles.middlePar}>
          A. Phlokk does not allow users who have been convicted of crimes
          against children to hold or post to any account on our platform. These
          crimes include but not limited to:
        </Text>
        <Text style={styles.middlePar}>
          1. Any registered sex offender {"\n"}
          {"\n"}
          2. Molestation {"\n"}
          {"\n"}
          3. Murder of a child {"\n"}
          {"\n"}
          4. Physical abuse or neglect {"\n"}
          {"\n"}
          5. Abduction {"\n"}
          {"\n"}
          6. Parental kidnapping {"\n"}
          {"\n"}
          7. Trafficking {"\n"}
          {"\n"}
          8. Exploitation of minors for prostitution {"\n"}
          {"\n"}
          9. Live online sexual abuse of a minor {"\n"}
          {"\n"}
          10. Sexual exploitation of minors in {"\n"}
          {"\n"}
          the manner of travel or tourism {"\n"}
          {"\n"}
          11. Attempts to obtain or distribute {"\n"}
          {"\n"}
          child sexual abuse material {"\n"}
          {"\n"}
          12. Production, possession, or {"\n"}
          {"\n"}
          distribution of child sexual abuse material {"\n"}
        </Text>
        <Text style={styles.largeText}>B. Child Abuse or Neglect</Text>
        <Text style={styles.middlePar}>
          Any action or failure to act that places minors at risk of physical or
          psychological harm include but not limited to: *Physical abuse
          *Neglect *Child endangerment *Psychological or verbal abuse *Unfit
          living conditions *Lack of proper nutrition *Lack of proper/season
          appropriate clothing
        </Text>
        <Text style={styles.largeText}>
          INFRACTION IF YOU POST, UPLOAD, DOWNLOAD, STREAM, or SHARE:
        </Text>
        <Text style={styles.middlePar}>
          1. Any content that shows, glorifies or promotes physical abuse,
          mental abuse, neglect, endangerment, or psychological abuse of minors
        </Text>
        <Text style={styles.largeText}>
          C. Sexual Exploitation Involving Minors
        </Text>
        <Text style={styles.middlePar}>
          Phlokk will take action on any content or accounts involving child
          sexual abuse material or sexual exploitation of a minor. Sexual
          exploitation of a minor includes but not limited to: any abuse of a
          position of power or trust for sexual purposes, including profiting
          financially, socially, sexually, or politically from the exploitation
          of a minor. Child sexual abuse material is defined but not limited to:
          any visual depiction of sexually explicit nudity or improper or sexual
          conduct of a minor, be it captured/generated by predatory adults,
          friends, strangers or self-generated by minors.
        </Text>
        <Text style={styles.largeText}>
          INFRACTION IF YOU POST, UPLOAD, DOWNLOAD, STREAM, or SHARE:
        </Text>
        <Text style={styles.middlePar}>
          1. Any content that shares, reshares, offers to trade or sell, or
          directs users off platform to obtain or distribute child sexual abuse
          material. {"\n"}
          {"\n"}
          2. Any content that engages with minors in a sexualized way, or
          otherwise sexualizes a minor. {"\n"}
          {"\n"}
          3. Any content that depicts, solicits, glorifies, or encourages child
          abuse images including nudity, sexualized minors, or sexual activity
          with minors.{"\n"}
          {"\n"}
          4. Any content that depicts, promotes, normalizes, glorifies
          pedophilia or the sexual assault of a minor. {"\n"}
          {"\n"}
          5. Any content that may re-victimize or capitalizes on minor victims
          of abuse by third party reshares or reenactments of an assault or
          confessions made by the minor.{"\n"}
        </Text>
        <Text style={styles.largeText}>D. Sexual Grooming Behaviors</Text>
        <Text style={styles.middlePar}>
          Grooming behaviors are those in which an adult/pedophile attempts to
          build an emotional relationship with a minor in order to gain the
          minor's trust for the purposes of future or ongoing sexual contact,
          sexual abuse, trafficking, or other exploitation. These behaviors may
          include but not limited to: *Flattery/compliments *Message requests on
          or off platform *Requests for personal information (ex: phone number
          or address), *Solicitation of minor sexual abuse material (ex: asking
          for nude photos or videos) *Sexual solicitations (ex: asking for sex
          of any kind) or sexual comments *Gift-giving on and off platform
        </Text>
        <Text style={styles.largeText}>
          INFRACTION IF YOU POST, UPLOAD, DOWNLOAD, STREAM, or SHARE:
        </Text>
        <Text style={styles.middlePar}>
          1. Any grooming/sexual advances {"\n"}
          {"\n"}
          2. Any content that depicts, promotes, normalizes, or glorifies
          grooming behaviors as listed above {"\n"}
          {"\n"}
          3. Any content that solicits/asks for real-life contact by phone or in
          person between a minor and an adult or between minors with a
          significant age difference {"\n"}
          {"\n"}
          4. Any content that shows or offers nudity to or with a minor {"\n"}
          {"\n"}
          5. Any content that solicits/asks minors to have contact with an adult
          on another platform, website, or other digital space {"\n"}
          {"\n"}
          6. Any solicitation/asking of nude images or sexual contact, through
          blackmail or other means of coercion, threats or force {"\n"}
        </Text>
        <Text style={styles.largeText}>
          E. Nudity or Sexual Acts Containing Minors
        </Text>
        <Text style={styles.middlePar}>
          Nudity and sexual activity involving minors include but not limited
          to: content that is overly revealing of breasts, nipples, genitals,
          anus, or buttocks, or behaviors that mimic, imply, or show sex acts
          involving minors. We do not allow any content, including digitally
          created or manipulated/photoshopped content, of nudity or sexual
          activity with minors or consenting adults.
        </Text>
        <Text style={styles.largeText}>
          INFRACTION IF YOU POST, UPLOAD, DOWNLOAD, STREAM, or SHARE:
        </Text>
        <Text style={styles.middlePar}>
          1. Any content that shows or implies minor sexual activities including
          penetrative and non-penetrative sex, oral sex, or intimate kissing{" "}
          {"\n"}
          {"\n"}
          2. Any content that involves sexual arousal or sexual stimulation with
          or because of a minor {"\n"}
          {"\n"}
          3. Any content that involves sexual fetishes with or because of a
          minor {"\n"}
          {"\n"}
          4. Any content that exposes genitals, buttocks, the pubic region, or
          female nipples of a minor {"\n"}
          {"\n"}
          5. Any content that contains sexually explicit language showing or
          describing a minor {"\n"}
          {"\n"}
          6. Any content involving a minor that contains sexually explicit song
          lyrics, words or dances {"\n"}
          {"\n"}
          7. Any content with sexually explicit dancing of a minor, including
          twerking, breast shaking, pelvic thrusting, or fondling the groin or
          breasts of themselves or another minor or adult {"\n"}
          {"\n"}
          8. Any content showing a minor undressing or changing clothes {"\n"}
          {"\n"}
          9. Any content showing a minor in minimal clothing that is
          situationally inappropriate {"\n"}
          {"\n"}
          10. Any sexualized comments, emojis, text, or other means used to
          secretly imply nudity or entice sexual activity of a minor{"\n"}
        </Text>
        <Text style={styles.largeText}>F. Harmful Acts by Minors</Text>
        <Text style={styles.middlePar}>
          Harmful minor activities include but not limited to: *The possession
          or consumption of substances prohibited for minors (ex. Alcohol or
          Tobacco products) *The misuse of legal substances (ex. Using household
          items to obtain a high) *Engagement in illegal activities (ex. Using
          controlled substances or vandalism) *Participating in activities,
          physical challenges, or dares that may threaten the well-being of
          minors (ex. Eating non consumable items)
        </Text>
        <Text style={styles.largeText}>
          INFRACTION IF YOU POST, UPLOAD, DOWNLOAD, STREAM, or SHARE:
        </Text>
        <Text style={styles.middlePar}>
          1. Any content that suggests, shows, imitates, reenacts or promotes
          the possession or consumption of alcoholic beverages, tobacco, drugs
          or anything not prescribed to/by a minor {"\n"}
          {"\n"}
          2. Any content that gives instructions or gives places to obtain said
          items that target minors on how to buy, sell, or trade alcohol,
          tobacco, or controlled substances {"\n"}
          {"\n"}
          3. Any content that displays or promotes activities that may
          jeopardize or harm minor well-being, including but not limited to:
          physical challenges, dares, or stunts {"\n"}
        </Text>
        <Text style={styles.largeText}>
          ADULT Nudity and Sex Acts: Section 2
        </Text>
        <Text style={styles.middlePar}>
          Phlokk wants you to have fun and be yourself but do it with clothes
          on! We do not allow nudity, pornography, or overly sexualized content
          on our platform. We also prohibit content showing, glorifying or
          promoting non-consensual sex acts, the sharing of non-consensual nude
          photos or videos, and adult sexual harassment. Nudity and sex acts
          include but not limited to: *Content that is overly revealing of
          breasts, female nipples, genitals, anus, or buttocks *We do not allow
          photos or videos including digitally created/cartoons,
          manipulated/photoshopped content, of nudity or sex acts. We are aware
          that some content may be offensive to some people, culturally
          inappropriate in certain regions or may not be suitable for minors. If
          the content is offensive to you, your culture or you minor child sees
          it and it does not violate our community guidelines please feel free
          to block the offending creator. An infraction of adult nudity, sex
          acts (all of section 2) or adult sexual exploitation will result in
          the content being removed, possible repercussions to the offenders
          account and the offender could possibly face legal actions against
          them.
        </Text>
        <Text style={styles.largeText}>
          INFRACTION IF YOU POST, UPLOAD, DOWNLOAD, STREAM, or SHARE:
        </Text>
        <Text style={styles.middlePar}>
          1. Any content that displays sex acts including penetrative and
          non-penetrative sex, and/or oral sex {"\n"}
          {"\n"}
          2. Any content that depicts sexual stimulation (ex. Use of hand on
          oneself or another) {"\n"}
          {"\n"}
          3. Any content that shows genitals, buttocks, the pubic region, or
          female nipples {"\n"}
          {"\n"}
          4. Any content that contains sexually explicit language for sexual
          gratification (ex. Phone sex or web cam sex){"\n"}
        </Text>
        <Text style={styles.largeText}>A. Sexual Exploitation</Text>
        <Text style={styles.middlePar}>
          Sexual exploitation is defined as any actual or attempted abuse of a
          position of vulnerability, power, or trust for sexual purposes,
          including profiting monetarily, socially, or politically from the
          sexual exploitation of another. Sexually exploitative content is
          prohibited.
        </Text>
        <Text style={styles.largeText}>
          INFRACTION IF YOU POST, UPLOAD, DOWNLOAD, STREAM, or SHARE:
        </Text>
        <Text style={styles.middlePar}>
          1. Any content that shows, solicits/asks, promotes, normalizes, or
          glorifies non-consensual sex acts and/or non-consensual touching,
          including including but not limited to: rape and sexual assault {"\n"}
          {"\n"}
          2. Any content that shows, solicits, promotes, normalizes, or
          glorifies the sharing of non-consensual intimate photos, videos or
          audio recording, that are taken, recorded, created, or shared without
          consent {"\n"}
          {"\n"}
          3. Any content that shows, promotes, normalizes, or glorifies sexual
          violence of any kind {"\n"}
          {"\n"}
          4. Any content that shows, promotes, or glorifies sexual solicitation,
          including but not limited to: offering or asking for sex partners,
          unwanted sexual chats or nude photos or videos, sex services, premium
          sex content, or virtual sex.
        </Text>
        <Text style={styles.largeText}>Bullying and Harassment: Section 3</Text>
        <Text style={styles.middlePar}>
          Bullying and harassment is a zero tolerance infraction. An infraction
          of bullying, harassment, threats, hateful behavior, hateful ideology
          (all of section 3) be it photo, video or audio will result in a
          permanent ban from the Phlokk platform. Think before you press post!
        </Text>
        <Text style={styles.largeText}>A. Bullying Behavior</Text>
        <Text style={styles.middlePar}>
          Any and all content that is abusive in nature, including but not
          limited to: *threats of any kind *any content or comments that are
          found degrading to a person, group of people or business *any content
          or comments that mock, humiliate, embarrass, intimidate, or hurt a
          person, group of people or a business
        </Text>
        <Text style={styles.largeText}>
          INFRACTION IF YOU POST, UPLOAD, DOWNLOAD, STREAM, or SHARE:
        </Text>
        <Text style={styles.middlePar}>
          1. Any content that intentionally insults or degrades another person,
          group of people or business, on the basis of attributes such as
          intellect, appearance, personality traits, or hygiene {"\n"}
          {"\n"}
          2. Any content that encourages other people to participate in
          harassment of any kind {"\n"}
          {"\n"}
          3. Any content that degrades victims of violent tragedies {"\n"}
          {"\n"}
          4. Any content that is a duet of the original offending content to
          degrade others {"\n"}
          {"\n"}
          5. Any content that contains willful harm or intimidation, such as
          cyberstalking, stalking, doxxing or trolling {"\n"}
          {"\n"}
          6. Any content that wishes ill will toward another including but not
          limited to: death, serious disease, or other serious harm on an
          individual or group of people {"\n"}
        </Text>
        <Text style={styles.largeText}>B. Hate Speech</Text>
        <Text style={styles.middlePar}>
          Phlokk has zero tolerance for discrimination in any form. Any content
          that contains hate speech or involves hateful behavior, will be
          deleted as soon as it is found and the offender will be permanently
          banned from Phlokk
        </Text>
        <Text style={styles.largeText}>
          Hate Speech of Protected Attributes
        </Text>
        <Text style={styles.middlePar}>
          Hate speech or hateful behavior is considered any content that
          attacks, threatens, incites violence against a person or group of
          people, or dehumanizes an individual or a group of people on the basis
          of the following protected attributes: {"\n"}
          {"\n"}
          1. Race {"\n"}
          {"\n"}
          2. Ethnicity {"\n"}
          {"\n"}
          3. National Origin {"\n"}
          {"\n"}
          4. Religion {"\n"}
          {"\n"}
          5. Caste {"\n"}
          {"\n"}
          6. Sexual Orientation {"\n"}
          {"\n"}
          7. Sex {"\n"}
          {"\n"}
          8. Gender {"\n"}
          {"\n"}
          9. Gender Identity {"\n"}
          {"\n"}
          10. Serious Disease {"\n"}
          {"\n"}
          11. Disability {"\n"}
          {"\n"}
          12. Immigration Status{"\n"}
        </Text>
        <Text style={styles.largeText}>C. Slurs and Slang Speech</Text>
        <Text style={styles.middlePar}>
          Slurs are defined as derogatory terms that are intended to degrade
          groups or individuals based on any protected attributes listed above.
          Any form of content or comment containing a slur or slang directed at
          another person or group of people will be deleted and the offender
          will be banned permanently from Phlokk
        </Text>
        <Text style={styles.largeText}>
          INFRACTION IF YOU POST, UPLOAD, DOWNLOAD, STREAM, or SHARE:
        </Text>
        <Text style={styles.middlePar}>
          1. Any content stating individuals or groups of people with protected
          attributes are physically, mentally, or morally inferior or referring
          to them in a derogatory manner. {"\n"}
          {"\n"}
          2. Any content promoting or justifying violence or threats of,
          exclusion, segregation, or discrimination against a person or group of
          people {"\n"}
          {"\n"}
          3. Any content that includes the use of slurs or slang against another
          person or group of people {"\n"}
          {"\n"}
          4. Any content that targets transgender or non-binary individuals or
          groups through intentionally misgendering or degrading them {"\n"}
          {"\n"}
          5. Any content that shows harm or threats of harm being inflicted on
          an individual or a group of people on the basis of a protected
          attribute
        </Text>
        <Text style={styles.largeText}>D. Hateful Ideology</Text>
        <Text style={styles.middlePar}>
          Hateful ideologies are those that obviously show hatred toward a
          person or group of people because of their protected attributes
          (listed above). Hateful ideology is strictly prohibited the content
          will be deleted and any offender will be permanently banned from
          Phlokk.
        </Text>
        <Text style={styles.largeText}>
          INFRACTION IF YOU POST, UPLOAD, DOWNLOAD, STREAM, or SHARE:
        </Text>
        <Text style={styles.middlePar}>
          1. Any content that praises, promotes, glorifies, or supports any
          hateful ideology (ex. racism, misogyny, anti-LGBTQ, antisemitism,
          bigotry) {"\n"}
          {"\n"}
          2. Any content that contains names or slurs, symbols, logos, flags,
          slogans, uniforms, gestures, salutes, paintings/cartoons, pictures,
          music, lyrics, or anything obviously related to a hateful ideology or
          hate group {"\n"}
          {"\n"}
          3. Any content that promotes, supports, or advertises a hate group,
          hate organization or conversion ideology {"\n"}
          {"\n"}
          4. Any content that denies, dismisses or alters documented historical
          or current violent or harmful events that have taken place affecting
          groups with protected attributes {"\n"}
          {"\n"}
          5. Any content containing claims of supremacy over a person or group
          of people {"\n"}
          {"\n"}
          6. Any content used to justify or promote hateful ideologies or groups
        </Text>
        <Text style={styles.largeText}>E. Sexual Harassment</Text>
        <Text style={styles.middlePar}>
          Sexual harassment is defined as unwanted or inappropriate sexual
          advances, sexual innuendos, sending or receiving nude photos or videos
          to another person. Sexual harassment is strictly prohibited the
          content will be deleted and any offender will be permanently banned
          from Phlokk.
        </Text>
        <Text style={styles.largeText}>
          INFRACTION IF YOU POST, UPLOAD, DOWNLOAD, STREAM, or SHARE:
        </Text>
        <Text style={styles.middlePar}>
          1. Any content that attempts to make unwanted sexual advances {"\n"}
          {"\n"}
          2. Any content that degrades another person’s sexual choices {"\n"}
          {"\n"}
          3. Any unwanted content that mimics sex acts with another person{" "}
          {"\n"}
          {"\n"}
          4. Any content that has been altered of yourself or another person to
          deceive others about sex acts that may or may not have occurred {"\n"}
          {"\n"}
          5. Any content that discloses, or threats to disclose details of a
          person's private sex life, in any form {"\n"}
          {"\n"}
          6. Any content that discloses, or threatens to disclose, a person's
          sexual orientation with or without their consent. If a user wants
          their orientation known they themselves state such information {"\n"}
        </Text>
        <Text style={styles.largeText}>F. Hacking, Doxing, and Extortion</Text>
        <Text style={styles.middlePar}>
          Hacking is defined as gaining access to another users account without
          their consent. Doxxing is defined as making a person’s private
          information public this includes but not limited to: their real name,
          home address, work address, job title, any landline or cell phone
          number, or personal or business email addresses. Extortion is defined
          as obtaining something, usually money, through force, threats of
          violence or telling private information. Hacking, doxxing and
          extortion is strictly prohibited the content will be deleted and any
          offender will be permanently banned from Phlokk.
        </Text>
        <Text style={styles.largeText}>
          INFRACTION IF YOU POST, UPLOAD, DOWNLOAD, STREAM, or SHARE:
        </Text>
        <Text style={styles.middlePar}>
          1. Any content that contains or threats to disclose, personal private
          information including but not limited to: real name, home or work
          address, personal or business email address, home, work or cell phone
          number, banking statements, social security number, or any information
          to leads another person to the doxxed user in a real life situation.{" "}
          {"\n"}
          {"\n"}
          2. Any content that threatens to extort another person in any way{" "}
          {"\n"}
          {"\n"}
          3. Any content that threatens to hack another persons account {"\n"}
          {"\n"}
          4. Any content that promotes, glorifies, instructs or encourages
          others to hack or dox another person
          {"\n"}
          {"\n"}
          5. Any content that promotes, glorifies, instructs or encourages
          others to physically or verbally abuse, troll, or harass another
          person/user {"\n"}
        </Text>
        <Text style={styles.largeText}>
          **Privacy, Personal Information, and Personally Identifiable
          Information (PII)
        </Text>
        <Text style={styles.middlePar}>
          Phlokk does not allow any content that violates the privacy, safety or
          confidentiality of personal information or personally identifiable
          information (PII) (ex. social security numbers, phone numbers,
          physical addresses). Any content that contains others personal private
          information or PII is strictly prohibited the content will be deleted
          and any offender will be permanently banned from Phlokk. The offending
          content if need be will be turned over to the proper authorities.
        </Text>
        <Text style={styles.largeText}>
          INFRACTION IF YOU POST, UPLOAD, DOWNLOAD, STREAM, or SHARE:
        </Text>
        <Text style={styles.middlePar}>
          1. Any content that contains others personal private information or
          personally identifiable information (PII) 
        </Text>
        <Text style={styles.largeText}>G. Malicious Reporting</Text>
        <Text style={styles.middlePar}>
          Malicious reporting is when a user repeatedly reports an account due
          to personal issues with another user to intentionally have their
          account banned instead of reporting truly offensive content. This is
          considered harassment and bullying. If a user is found to be
          maliciously reporting another user the malicious reporter will receive
          the infraction and will be permanently banned from the Phlokk
          platform.
        </Text>
        <Text style={styles.largeText}>H. Violence</Text>
        <Text style={styles.middlePar}>
          Phlokk does not tolerate violence, support of violence, instruction on
          violence or threats of violence in any form. If the violence is a
          threat to public safety it will be turned over to the proper
          authorities in the offenders country or region. Violence or the threat
          of violence is strictly prohibited the content will be deleted and any
          offender will be permanently banned from Phlokk.
        </Text>
        <Text style={styles.largeText}>
          INFRACTION IF YOU POST, UPLOAD, DOWNLOAD, STREAM, or SHARE:
        </Text>
        <Text style={styles.middlePar}>
          1. Any content containing the act of, intent or threat of inflicting
          physical injuries on a person or a group {"\n"}
          {"\n"}
          2. Any content that encourages, instructs, advocates or glorifies
          others to commit violence or harm to themselves or others {"\n"}
          {"\n"}
          3. Any content that advocates for others to meet at a location with or
          without weapons for the purpose to harm, intimidate or threaten an
          individual or group with violence {"\n"}
          {"\n"}
          4. Any content that gives instructions on making or using weapons that
          may cause violence or harm to a person or group {"\n"}
        </Text>
        <Text style={styles.largeText}>I. Violent/Hate Groups and People</Text>
        <Text style={styles.middlePar}>
          Phlokk does not allow terrorist groups, hate groups, criminal groups
          or any group or person with the intent to incite violence or hate, to
          recruit, or spread their hate filled agenda on our platform. The
          offending content will be deleted and any offender will be permanently
          banned from Phlokk. Any content that is found to be criminal will be
          turned over to the proper authorities. *Terrorist groups (foreign or
          domestic) use calculated violence (or the threat of violence) against
          civilians in order to obtain goals that are political or religious or
          ideological in nature. *Hate group is a social group (foreign or
          domestic) that advocates and practices hatred, hostility, or violence
          towards people of a different race, ethnicity, nation, religion,
          gender, gender identity, sexual orientation or any person with
          protected attributes (section 3:B). *Criminal groups is a group of
          individuals or organization engaging in criminal activity for the
          purpose of procuring tangible, monetary, political, or ideological
          gain.
        </Text>
        <Text style={styles.largeText}>
          INFRACTION IF YOU POST, UPLOAD, DOWNLOAD, STREAM, or SHARE:
        </Text>
        <Text style={styles.middlePar}>
          1. Any content that recruits, praises, advocates, glorifies, or
          supports violent acts or violent/hate group or person {"\n"}
          {"\n"}
          2. Any content that offers participation, recruitment, or gives
          invitation to violent/hate groups {"\n"}
          {"\n"}
          3. Any content with names, symbols, logos, flags, slogans, uniforms,
          gestures, salutes, paintings/cartoons, pictures, music, lyrics,
          literature or anything that represents violent/hate groups or people
          {"\n"}
        </Text>
        <Text style={styles.largeText}>Dangerous Content: Section 4</Text>
        <Text style={styles.middlePar}>
          Phlokk does not allow users to post or share content showing,
          promoting, normalizing or glorifying dangerous acts that may lead to
          serious injury or death. A dangerous act or behavior are acts
          performed or imitated in a non-professional manner or without the
          necessary skill set or education and/or lack of safety precautions
          that may lead to serious injury or death for the user or the public.
          This includes amateur stunts, dangerous challenges/dares or dangerous
          trends. An infraction of dangerous content (all of section 4) will be
          deleted upon review further actions upon offenders account and
          offender could face legal problems.
        </Text>
        <Text style={styles.largeText}>
          INFRACTION IF YOU POST, UPLOAD, DOWNLOAD, STREAM, or SHARE:
        </Text>
        <Text style={styles.middlePar}>
          1. Any content that shows the inappropriate use of possible dangerous
          tools or objects {"\n"}
          {"\n"}
          2. Any content that contains dangerous driving (ex. Illegal racing or
          live while driving) {"\n"}
          {"\n"}
          3. Any content that shows, instructs or promotes ingesting substances
          that are not meant for consumption and could lead to severe harm or
          death {"\n"}
          {"\n"}
          4. Any content that shows how (written or verbal) or teaches how to
          perform a dangerous act {"\n"}
          {"\n"}
          5. Any dangerous games, dares, challenges, trends on other platforms
          or from real-life or stunts that might lead to injury or property
          damage {"\n"}
        </Text>
        <Text style={styles.largeText}>A. Shock or Graphic Content</Text>
        <Text style={styles.middlePar}>
          *Shock content contains but not limited to violent language, gruesome
          or disgusting images, or graphic images or accounts of physical
          trauma. *Graphic violence contains but not limited to clear and
          uncensored depiction of various violent acts. The violence depicted
          must be of a absolute and unshielded nature. (ex. video of a person
          being shot). The offending content will be remove and could lead to an
          infraction upon your account.
        </Text>
        <Text style={styles.largeText}>
          INFRACTION IF YOU POST, UPLOAD, DOWNLOAD, STREAM, or SHARE:
        </Text>
        <Text style={styles.middlePar}>
          1. Any content containing violent or graphic deaths or accidents{" "}
          {"\n"}
          {"\n"}
          2. Any content containing dismembered, mutilated, charred, or burned
          human remains {"\n"}
          {"\n"}
          3. Any content containing gore where a large open wound or injury is
          the core focus that is not used for education purposes {"\n"}
          {"\n"}
          4. Any content from real-life situations contain physical violence,
          fighting, or torture {"\n"}
          {"\n"}
          5. Any content containing the slaughter or non-natural death of
          animals that is not used in an educational manner {"\n"}
          {"\n"}
          6. Any content that contains animal remains that are dismembered,
          mutilated, charred, or burned {"\n"}
          {"\n"}
          7. Any content that contains animal cruelty and gore that are not for
          the purposes of educating the public{"\n"}
        </Text>
        <Text style={styles.largeText}>Mental Health: Section 5</Text>
        <Text style={styles.middlePar}>
          Phlokk is meant to be a supportive community of all people. Mental
          health is a very important subject that should in no way be shamed or
          made taboo. Users are allowed to share their personal experiences past
          or present with mental illness or disorders in a safe and educational
          manner to raise awareness and find support. Phlokk does not allow
          content showing, encouraging, normalizing, or glorifying acts that
          could lead to suicide, self-harm, eating disorders or any other mental
          illness or disorder. Should you see any content that degrades,
          dismisses, encourages, or glorifies any mental illness or disorder
          please report it immediately. If you feel a user you know personally
          is contemplating suicide please call your local emergency number or in
          the US call the Suicide Prevention Hotline 1-800-273-8255. Should we
          find content we deem that the user is in imminent danger we reserve
          the right to contact emergency services for that user. Offending
          content (all of section 5) may be removed and at our discretion could
          cause an infraction to the offending users account.
        </Text>
        <Text style={styles.largeText}>A. Suicide or Self Harm</Text>
        <Text style={styles.middlePar}>
          Phlokk believes that understanding the issues around suicide and
          mental health illnesses is an important way to take part in suicide
          and self harm prevention. Known risk factors are but not limited to:
          Mental disorders, alcohol and substance abuse problems, hopelessness
          or depression, impulsive and/or aggressive behaviors, history of
          trauma or abuse, major physical illnesses, previous suicide attempt,
          family history of suicide or self harm, or job or financial loss. Any
          content containing anything that shows suicide, glorifies, normalizes,
          promotes or encourages suicide or self harm, instructions on how to
          commit suicide or self harm, hoaxes of suicide or self harm will be
          deleted, could lead to an account infraction and we reserve the right
          to contact authorities as we deem necessary.
        </Text>
        <Text style={styles.largeText}>
          INFRACTION IF YOU POST, UPLOAD, DOWNLOAD, STREAM, or SHARE:
        </Text>
        <Text style={styles.middlePar}>
          1. Any content that shows, encourages , normalizes, or glorifies
          suicide or self-harm {"\n"}
          {"\n"}
          2. Any content that instructs others to commit suicide/self harm{" "}
          {"\n"}
          {"\n"}
          3. Any content that gives instruction on how to commit
          suicide/self-harm {"\n"}
          {"\n"}
          4. Any content that encourages, instructs, or glorifies suicide/self
          harm games, dares, challenges, trends, pacts, or hoaxes{"\n"}
        </Text>
        <Text style={styles.largeText}>B. Eating Disorders</Text>
        <Text style={styles.middlePar}>
          There is a commonly held misconception that eating disorders are a
          lifestyle choice. Eating disorders are actually serious and often
          fatal illnesses that are associated with severe disturbances in
          people’s eating behaviors and related thoughts and emotions.
          Preoccupation with food, body weight, and shape may also signal an
          eating disorder. Common eating disorders include anorexia nervosa,
          bulimia nervosa, and binge-eating disorder. Phlokk does not allow any
          content that contains anything that instructs how to perform or
          maintain an eating disorders, glorifies, normalizes, promotes or
          encourages eating disorders. Offending content may be removed and at
          our discretion could cause an infraction to the offending users
          account.
        </Text>
        <Text style={styles.largeText}>
          INFRACTION IF YOU POST, UPLOAD, DOWNLOAD, STREAM, or SHARE:
        </Text>
        <Text style={styles.middlePar}>
          1. Any content that gives instruction, promotes, normalizes, or
          glorifies eating disorders {"\n"}
          {"\n"}
          2. Any content that instructs, encourages, normalizes, or glorifies
          any dangerous eating disorder behaviors {"\n"}
          {"\n"}
          3. Any content that encourages, instructs, or glorifies eating
          disorders or weight loss games, dares, challenges, trends, or pacts
          {"\n"}
        </Text>
        <Text style={styles.largeText}>Honesty and Character: Section 6</Text>
        <Text style={styles.middlePar}>
          Phlokk firmly believes that honesty, integrity and basic good morals
          is the key to a safe and happy community. We do not allow dishonesty
          against our platform or users, fake or 3rd party interaction to
          falsely inflate an account or our platform, spam or bots, malicious
          impersonation to mislead or gain any items of value or false news or
          information that misleads or harms the community. Offending content
          (all of section 6) will be removed and at our discretion could cause
          an infraction to the offending users account.
        </Text>
        <Text style={styles.largeText}>
          A. Spam, Bots and Fake/3rd Party Interaction
        </Text>
        <Text style={styles.middlePar}>
          Phlokk defines spam as irrelevant or inappropriate messages sent on
          the internet to a large number of recipients by a user or bot (ex.
          Comment of follow this link to a porn site). Spam is also considered
          as anyone who unwantedly and excessively interacts with another users
          account with the intent to upset another user. (ex. Making unwanted
          comments on every post of another users page). Phlokk defines bots as
          an autonomous program on the internet or another network that can
          interact with systems or users (ex. Robots that can comment or send
          messages). Phlokk determines fake/3rd party interaction as any content
          or act with the sole intent to artificially inflate an accounts follow
          count or play count. (ex. Paying for fake followers or views from an
          off platform site) These acts are prohibited on our platform.
          Offending content will be removed and at our discretion could cause an
          infraction to the offending users account.
        </Text>
        <Text style={styles.largeText}>
          INFRACTION IF YOU POST, UPLOAD, DOWNLOAD, STREAM, or SHARE:
        </Text>
        <Text style={styles.middlePar}>
          1. Any content that gives instructions on how to find or use 3rd party
          sites to increase: views, likes, followers, shares, or comments {"\n"}
          {"\n"}
          2. Any user or content that participates in 3rd party selling or
          buying views, likes, followers, shares, or comments {"\n"}
          {"\n"}
          3. Any content that encourages or promotes a 3rd party site or app for
          fake interaction {"\n"}
          {"\n"}
          4. Any content or user who offers or attempts to make other users
          pay/gift for follows, views, duets, or shout outs.{"\n"}
          {"\n"}
          5. Any content or user who creates software or modifies code to gain
          fake views, likes, followers, shares, or comments{"\n"}
        </Text>
        <Text style={styles.largeText}>B. Malicious Impersonation</Text>
        <Text style={styles.middlePar}>
          Phlokk defines malicious impersonation as a person or content that
          fraudulently poses as a trusted (well-known or famous)
          person/figure/business/brand to gain money, valuables, account
          inflation or private information from other users. We do not allow
          content or users to pose as a trusted person/figure/business/brand for
          gains of any kind. Users may have fan, or parody accounts but they
          must clearly state in their user name “fan, fan page, parody of, ect.”
          before or after the trusted person/figure/business/brand name and can
          not use the account or contain any content to deceive the public or
          other users. Offending content will be removed and at our discretion
          could cause an infraction to the offending users account.
        </Text>
        <Text style={styles.largeText}>
          INFRACTION IF YOU POST, UPLOAD, DOWNLOAD, STREAM, or SHARE:
        </Text>
        <Text style={styles.middlePar}>
          1. Any content or user that poses as another user or trusted
          person/figure/business/brand by using anothers name, almost identical
          username, use of details of another user or trusted
          person/figure/business/brand or profile picture in a deceitful manner
          or without written permission. {"\n"}
          {"\n"}
          2. Any content or user that does not include a disclosure in the
          username of a fan or parody account (ex. “fan, fan page, parody of,
          ect.”).
        </Text>
        <Text style={styles.largeText}>
          C. Misleading or Harmful Misinformation/Disinformation
        </Text>
        <Text style={styles.middlePar}>
          Phlokk defines misinformation as any kind of wrong or false
          information with or without deceitful intent. Phlokk defines
          disinformation as known false information. Phlokk defines misleading
          or harmful misinformation/disinformation as any user or content
          intended or unintentional, to lead others in a wrong direction or into
          a mistaken action or belief often by deliberate deceit (intentional
          lies, propaganda, fake news). We do not allow any user or content that
          could cause significant harm to users, our community, or the mass
          public regardless of intent. Offending content will be removed and at
          our discretion could cause an infraction to the offending users
          account.
        </Text>
        <Text style={styles.largeText}>
          INFRACTION IF YOU POST, UPLOAD, DOWNLOAD, STREAM, or SHARE:
        </Text>
        <Text style={styles.middlePar}>
          1. Any content or user that contains any information that causes hate,
          prejudice or racism {"\n"}
          {"\n"}
          2. Any content or user that contains any false information about
          emergencies that induces panic or mental harm {"\n"}
          {"\n"}
          3. Any content or user that contains false medical information that
          can cause harm to a persons physical or mental health {"\n"}
          {"\n"}
          4. Any content or user that misleads others about elections or other
          civic processes {"\n"}
          {"\n"}
          5. Any content or user that contains conspiracy theories that target a
          specific person or a protected group, incites violence, or denies a
          violent or tragic event occurred past or present {"\n"}
          {"\n"}
          6. Any content or user that contains digital forgeries (fake news)
          that mislead users by manipulating the truth of events that do/can
          cause harm to the subject of the fake news, others, or the mass public{" "}
          {"\n"}
          {"\n"}
          7. Any content or user that engages in coordinated deceitful behavior.
          (ex. Using multiple accounts to influence and sway public opinion with
          false information or fake news.){"\n"}
        </Text>
        <Text style={styles.largeText}>D. Fraud and Scams</Text>
        <Text style={styles.middlePar}>
          Phlokk understands that generally it’s users are caring, kind and
          giving people, but not everyone is honest. If you donate, gift on or
          off platform, send money through a 3rd party app know you are doing
          this at your own risk and judgement. We will take every measure within
          our means to ensure legitimacy of anyone asking for financial help and
          remove anyone asking for financial help under false pretenses. Phlokk
          defines fraud as the intentional deception to obtain unfair or
          unlawful gain, (ex. Money, valuables or private information) or to
          deprive a victim of a legal right. Phlokk defines scam as a fraudulent
          or dishonest act or operation to gain money, valuables or private
          information. Frauds and scams are strictly prohibited on our platform.
          Offending content will be removed and at our discretion could cause an
          infraction to the offending users account.
        </Text>
        <Text style={styles.largeText}>
          INFRACTION IF YOU POST, UPLOAD, DOWNLOAD, STREAM, or SHARE:
        </Text>
        <Text style={styles.middlePar}>
          1. Any content that promotes phishing (fraudulently sending emails
          supposedly from reputable companies to gain personal private
          ,information.) {"\n"}
          {"\n"}
          2. Any content that promotes ponzi, pyramid schemes or any deceitful
          way to gain money {"\n"}
          {"\n"}
          3. Any content that promotes investment schemes, fixed betting, or any
          other types of scams {"\n"}
          {"\n"}
          4. Any content containing or promoting a donation based fundraiser
          that is fraudulent{"\n"}
        </Text>
        <Text style={styles.largeText}>
          Illegal Act and Regulated Items: Section 7
        </Text>
        <Text style={styles.middlePar}>
          Phlokk is committed to ensuring that content containing, glorifying
          of, promotion of, encouragement of illegal acts or regulations are not
          on our platform. Certain regulated goods must not be sold, promoted or
          used on our platform. The following but not limited to the following
          acts or items are strictly prohibited on our platform. Offending
          content (all of section 7) will be removed and at our discretion could
          cause an infraction to the offending users account. The offending
          content if need be will be turned over to the proper authorities.
        </Text>
        <Text style={styles.largeText}>A. Criminal Acts</Text>
        <Text style={styles.middlePar}>
          Phlokk defines criminal acts as any act committed by a person or group
          that violates a law and is punishable by local, state or federal
          authorities (ex. Assault, counterfeiting, exploitation, stalking,
          theft, or vandalism) Offending content that contains, glorifies,
          encourages, promotes or instructs criminal acts will be removed and at
          our discretion could cause an infraction to the offending users
          account. The offending content if need be will be turned over to the
          proper authorities.
        </Text>
        <Text style={styles.largeText}>
          INFRACTION IF YOU POST, UPLOAD, DOWNLOAD, STREAM, or SHARE:
        </Text>
        <Text style={styles.middlePar}>
          1. Any content that contains, encourages, promotes or glorifies acts
          of physical harm {"\n"}
          {"\n"}
          2. Any content that contains, encourages, promotes or glorifies acts
          that does/could effect the safety of others, including swatting {"\n"}
          {"\n"}
          3. Any content that contains, encourages, promotes or glorifies
          “swatting” defined as making a prank call to emergency services in an
          attempt to dispatch of a large number of armed police officers to a
          particular address be it the user or others. {"\n"}
          {"\n"}
          4. Any content that contains, encourages, promotes or glorifies human
          exploitation of any kind, including but not limited to: human
          smuggling, bonded labor, domestic servitude, sex trafficking, or
          prostitution {"\n"}
          {"\n"}
          5. Any content that contains, encourages, promotes or glorifies
          vandalism or damage to another's possessions {"\n"}
          {"\n"}
          6. Any content that contains, encourages, promotes or glorifies the
          poaching or illegal trade of wildlife or endangered species {"\n"}
          {"\n"}
          7. Any content that contains, encourages, promotes, instructs or
          glorifies the purchase, sale, trade, or seeking of unlawfully acquired
          (stolen) or counterfeit items or money {"\n"}
          {"\n"}
          8. Any content that contains, encourages, promotes, instructs or
          glorifies others how to conduct any criminal act{"\n"}
        </Text>
        <Text style={styles.largeText}>B. Firearms or Weapons</Text>
        <Text style={styles.middlePar}>
          Phlokk does not allow content that contains a firearm or weapon, or
          the sale, trade, instructions on making or altering of firearms/guns,
          accessories, or explosive devices. Users are allowed to have content
          containing firearms/guns only if: the content is educational, the user
          is military or law enforcement as part of their uniform, the content
          is in a safe, instructional, and controlled environment and being used
          in a safe lawful manner. (Ex. Gun range, hunting or firearms training)
          Offending content that contains a firearm/gun or explosive, the sale,
          trade, instructions on making or altering of firearms/guns or
          explosives, accessories, or explosive devices or instructs criminal
          acts will be removed and at our discretion could cause an infraction
          to the offending users account. The offending content if need be will
          be turned over to the proper authorities.
        </Text>
        <Text style={styles.largeText}>
          INFRACTION IF YOU POST, UPLOAD, DOWNLOAD, STREAM, or SHARE:
        </Text>
        <Text style={styles.middlePar}>
          1. Any content that contains firearms/guns, firearm accessories,
          ammunition, or explosive weapons unless the content meets the
          exception rules of only if: the content is educational, the user is
          enforcement as part of their uniform, the content is in a safe,
          instructional, and controlled environment and being used in a safe
          lawful manner. (Ex. Gun range, hunting or firearms training) {"\n"}
          {"\n"}
          2. Any content that offers the purchase, sale, trade, or seeking of
          firearms, accessories, ammunition, explosive weapons, or instructions
          on how to make or alter firearms or explosives
        </Text>
        <Text style={styles.largeText}>
          C. Drugs, Controlled Substances, Alcohol, and Tobacco
        </Text>
        <Text style={styles.middlePar}>
          Phlokk does not allow content that contains illegal drugs or
          controlled substances (with or without a prescription), or the sale,
          trade, seeking, or instructions on how to obtain or make these
          substances. Phlokk does not allow content that offers sales, trade, or
          instruction on how to make tobacco or alcoholic items. Offending
          content will be removed and at our discretion could cause an
          infraction to the offending users account. The offending content if
          need be will be turned over to the proper authorities.
        </Text>
        <Text style={styles.largeText}>
          INFRACTION IF YOU POST, UPLOAD, DOWNLOAD, STREAM, or SHARE:
        </Text>
        <Text style={styles.middlePar}>
          1. Any content that contains or offers the purchase, sale, trade,
          glorifying use or seeking of drugs, drug consumption, or instructs
          others to make, use, or sell or trade drugs or other controlled
          substances {"\n"}
          {"\n"}
          2. Any content that offers the purchase, sale, trade, or seeking of
          drugs or other controlled substances, alcohol or tobacco products
          including but not limited to: vaping products, smokeless or
          combustible tobacco products, synthetic nicotine products,
          E-cigarettes, and other electronic nicotine delivery systems {"\n"}
          {"\n"}
          3. Any content that contains information on how to buy, where to buy,
          or make illegal or controlled substances {"\n"}
          {"\n"}
          4. Any content that contains, instructs how to or glorifies the misuse
          of legal substances, or gives instruction on how to alter household
          substances, to become intoxicated{"\n"}
        </Text>
        <Text style={styles.largeText}>D. Gambling and Betting</Text>
        <Text style={styles.middlePar}>
          Phlokk does not allow any content that encourages gambling or
          advertisements for any winning money by chance services including but
          not limited to: athletic betting, animal fights or races, or casinos.
          Offending content will be removed and at our discretion could cause an
          infraction to the offending users account. The offending content if
          need be will be turned over to the proper authorities.
        </Text>
        <Text style={styles.largeText}>
          INFRACTION IF YOU POST, UPLOAD, DOWNLOAD, STREAM, or SHARE:
        </Text>
        <Text style={styles.middlePar}>
          1. Any content that encourages, glorifies or advertises casinos,
          athletic betting, poker, lotteries, gambling-based software and apps,
          or other winning money by chance services
        </Text>
        <Text style={styles.largeText}>
          Copyright and Trademark Violations: Section 8
        </Text>
        <Text style={styles.middlePar}>
          A copyright is a legal right that protects original works of
          authorship (ex. music, videos) and original expression of an idea (ex.
          the specific way a video or music is expressed or created), although
          it does not protect underlying ideas or facts. A trademark is a word,
          symbol, slogan, or design that identifies and distinguishes the source
          of a product or service. (ex. Company logos like the Nike Swoosh or
          Apple’s bitten apple logo) We want all users to create and share
          original content. The use of copyrighted work under certain
          circumstances, such as the fair use doctrine or other applicable laws,
          or the use of a trademark to reference, lawfully comment, criticize,
          parody, make a fan page, or review a product or service, may not be
          considered a violation of our policies. Any content that violates
          someone else's intellectual property rights (copyrights and
          trademarks) is prohibited on Phlokk. Offending content will be removed
          and at our discretion could cause an infraction to the offending users
          account.
        </Text>
        <Text style={styles.largeText}>
          INFRACTION IF YOU POST, UPLOAD, DOWNLOAD, STREAM, or SHARE:
        </Text>
        <Text style={styles.middlePar}>
          1. Any content that violates or infringes another persons copyrights,
          trademarks, or other intellectual property rights
        </Text>
        <Text style={styles.largeText}>Platform Security: Section 9</Text>
        <Text style={styles.middlePar}>
          Phlokk’s highest priority is the safety and security of our users,
          creators, business partners, vendors, and employee data, including
          their personal information, accounts, profiles, content, and other
          proprietary information, as well as our product and services. We do
          not allow unauthorized access to the Phlokk platform including but not
          limited to: our website, app, network, and associated infrastructure
          or networks, or to obtain sensitive confidential commercial or
          personal information. Any attempt to hinder, hack into or abuse of the
          security, integrity or reliability of our platform, products, or
          services is strictly prohibited. Any person found to attempt to breach
          our security will have their entire account deleted and will be
          permanently banned from Phlokk. Any and all information about the
          person attempting to make a breach will be turned over to the proper
          authorities.
        </Text>
        <Text style={styles.largeText}>INFRACTION IF:</Text>
        <Text style={styles.middlePar}>
          1. Unauthorized attempt to access the Phlokk platform, as well as do
          not create false or misleading versions of the Phlokk platform{"\n"}
          {"\n"}
          2. Anyone who creates or distributes malicious files, content, or
          messages that contain viruses, Trojan horses, worms, logic bombs, or
          any other materials that may be harmful to the community or platform
          {"\n"}
          {"\n"}
          3. Anyone who uses automated scripts, web crawling, software,
          deceptive techniques, or any other way to attempt to obtain, acquire,
          or request login credentials or other sensitive information, including
          but not limited to non-public data, from Phlokk or our users{"\n"}
          {"\n"}
          4. Anyone who holds a Phlokk account under false or fraudulent
          pretenses to distribute spam, phishing, or smishing (smishing =
          fraudulent practice of sending text messages purporting to be from
          reputable companies to gain personal information.) content in an
          attempt to perpetrate cybercrime or gain unauthorized access to others
          content, accounts, systems, or data {"\n"}
          {"\n"}
          5. Anyone who does or attempts to modify, adapt, translate, reverse
          engineer, disassemble, decompile, or create any derivative products
          from Phlokk, including but not limited to any files, tables,
          documentation, or attempt to regenerate any source code, algorithms,
          methods, or techniques created by Phlokk {"\n"}
          {"\n"}
          6. Anyone who gives access to your account log in to others, helps, or
          encourages others to conduct activities against our Community
          Guidelines {"\n"}
          {"\n"}
          7. DO NOT click on suspicious links or engage in requests for
          information about your Phlokk account details, passwords, verification
          qualification, financial, or other personal information. Should you
          find a suspicious link please report it immediately.
        </Text>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.primary,
  },
  spacer: {
    paddingTop: 10,
  },
  spacerTop: {
    paddingTop: 40,
  },

  termsText: {
    flexDirection: "row",
    alignItems: "center",
  },
  policyText: {
    color: colors.white,
  },
  middlePar: {
    color: colors.white,
    padding: 10,
    fontWeight: "bold",
  },
  largeText: {
    color: colors.green,
    paddingTop: 10,
    padding: 10,
    fontWeight: "bold",
    fontSize: 15,
  },
});
