import csv, json, random

players={}
with open('gotcha_fall.csv', mode='r') as file:
    reader = csv.DictReader(file)
    for row in reader:
        name = row['first'] + " " + row['last']
        nick = row['nick']
        email = row['email']
        grade = row['class']
        players[name] = {'nick' : nick, 'email' : email, 'class' : grade}
# to_assign=players.copy()
# target = ""
# attacker = "Elizabeth Bower"
# while(to_assign!={}):
#     target=random.choice(to_assign.keys())
#     players[attacker]['target'] = target
#     players[target]['attacker'] = attacker
#     attacker=target
#     to_assign.pop(attacker)
with open('gotcha.json', mode='w+') as out:
    json.dump(players, out, sort_keys = True, indent = 4, ensure_ascii=False)
